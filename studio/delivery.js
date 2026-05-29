#!/usr/bin/env node
'use strict';

/**
 * delivery.js — genereert de oplevering voor een klant uit de /assets-map.
 *
 *   node delivery.js "Merknaam"   (of slug, of mapnaam zoals _demo)
 *
 * Naamconventie assets:  V<nr>_<type>_<lengte>_<hook>.<ext>
 *   bv. V01_cold_15s_jaren-oud-toen.mp4 · V07_retarget_30s_prijs-objectie.mp4
 *   type = cold | retarget | live   lengte = 15s | 30s
 * Schrijft clients/<merk>/05-oplevering.md. Alleen Node stdlib.
 */

const fs = require('fs');
const path = require('path');
const dates = require('./lib/dates');
const niches = require('./lib/niches');
const u = require('./lib/utils');

function fail(msg) { console.error(`\n  ✗ ${msg}\n`); process.exit(1); }

const MEDIA = new Set(['.mp4', '.mov', '.webm', '.m4v']);
const TYPE_LABEL = { cold: 'Cold 15s', retarget: 'Retarget 30s', live: 'Live-knipsel' };
const TYPE_GEBRUIK = {
  cold: 'Koude audience (brede TOF). Test als eerste; schaal de winnende hook.',
  retarget: 'Warme audience (bekeken/cart). Inzetten zodra de cold-winnaar bekend is.',
  live: 'Shoppable knipsel uit een Shop Live. Inzetten als herhaalbare social proof.',
};

/** Parse een bestandsnaam volgens conventie; best-effort bij afwijking. */
function parseAsset(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const parts = base.split('_');
  let nr = null, type = 'onbekend', lengte = '', hook = base;
  if (/^v\d+$/i.test(parts[0] || '')) nr = parseInt(parts[0].slice(1), 10);
  if (parts[1] && ['cold', 'retarget', 'live'].includes(parts[1].toLowerCase())) type = parts[1].toLowerCase();
  if (parts[2] && /^\d+s$/i.test(parts[2])) lengte = parts[2].toLowerCase();
  if (parts.length > 3) hook = parts.slice(3).join(' ').replace(/-/g, ' ');
  else if (type !== 'onbekend') hook = '(geen hook in bestandsnaam)';
  return { filename, nr, type, lengte, hook };
}

function main() {
  const arg = process.argv[2];
  if (!arg) fail('Geef een merknaam/slug op. Voorbeeld:\n     node delivery.js "Bloem Skincare"');

  const client = u.resolveClient(arg);
  if (!client) fail(`Geen klant gevonden voor "${arg}". Run eerst: node new-client.js "${arg}"`);

  const meta = u.readMeta(client);
  const niche = niches.getNiche(meta.niche);
  const assetsDir = path.join(u.clientDir(client), 'assets');

  let files = [];
  if (fs.existsSync(assetsDir)) {
    files = fs.readdirSync(assetsDir).filter((f) => MEDIA.has(path.extname(f).toLowerCase()));
  }

  const assets = files.map(parseAsset).sort((a, b) => (a.nr || 999) - (b.nr || 999));
  const counts = { cold: 0, retarget: 0, live: 0, onbekend: 0 };
  assets.forEach((a) => { counts[a.type] = (counts[a.type] || 0) + 1; });

  const eindeISO = meta.venster_einddatum;
  const resterend = dates.dagenResterend(eindeISO);
  const eindeNL = dates.nlLong(dates.parseISO(eindeISO));

  // 1. Inventaris
  const invRows = assets.length
    ? assets.map((a) => [
        a.nr ? `V${String(a.nr).padStart(2, '0')}` : '—',
        a.filename,
        a.lengte || '—',
        TYPE_LABEL[a.type] || a.type,
        a.hook,
        TYPE_GEBRUIK[a.type] || 'Beoordeel handmatig.',
      ])
    : [['—', '_nog geen assets in /assets_', '—', '—', '—', `Zet video's in clients/${client}/assets/ en run delivery.js opnieuw.`]];
  const inventaris = u.mdTable(
    ['#', 'Bestand', 'Lengte', 'Type', 'Hook', 'Aanbevolen gebruik'],
    invRows
  );

  // 2. A/B-advies
  const coldAssets = assets.filter((a) => a.type === 'cold');
  const retAssets = assets.filter((a) => a.type === 'retarget');
  const abLines = [];
  if (coldAssets.length >= 2) {
    abLines.push(`- **Cold tegen cold:** test ${coldAssets.slice(0, 3).map((a) => `V${String(a.nr).padStart(2, '0')}`).join(' vs ')} op dezelfde koude audience. Eén variabele: de hook (eerste 3s). Laat 48–72u draaien, kies de winnaar op hold-rate + CTR naar de Shop.`);
  } else if (coldAssets.length === 1) {
    abLines.push(`- **Cold:** ${`V${String(coldAssets[0].nr).padStart(2, '0')}`} als baseline. Lever 2 extra hook-varianten om echt te A/B-testen.`);
  }
  if (retAssets.length) {
    abLines.push(`- **Retarget per objectie:** zet ${retAssets.map((a) => `V${String(a.nr).padStart(2, '0')}`).join(', ')} in op wie de cold-video's zag/de cart verliet. Elke variant neemt één objectie weg (prijs / werkt-het / is-het-voor-mij).`);
  }
  abLines.push('- **Volgorde:** eerst de cold-winnaar vinden, dáárna retargeting opschalen. Niet alles tegelijk — je wilt een schone winnaar binnen het venster.');
  const abAdvies = abLines.join('\n');

  // 3. Posting-advies
  const posttijden = niche.posttijdenNL.join(' · ');

  const doc = `# Oplevering — ${meta.merknaam}

**Niche:** ${niche.label} · **Persona:** ${meta.persona} · **Pakket:** ${meta.pakket}
**Opgeleverd:** ${dates.nlLong(dates.today())}
**Aantal assets:** ${assets.length}  (cold: ${counts.cold} · retarget: ${counts.retarget} · live: ${counts.live}${counts.onbekend ? ` · onbekend: ${counts.onbekend}` : ''})

> **2%-venster:** loopt t/m ${eindeNL} — nog **${resterend} dagen** 2%-commissie.
> Draai het venster vol: post dagelijks, vind snel de winnende hook, schaal die.

## 1. Asset-inventaris
${inventaris}

## 2. A/B-testadvies
${abAdvies}

## 3. Posting-advies (NL)
- **Optimale posttijden voor ${niche.label}:** ${posttijden}
- **Ritme:** 1 video/dag; cold eerst (week 1–2), retarget opschalen (week 3–4).
- **Per dag één variabele wijzigen** zodat je weet wat het verschil maakt.

## 4. TikTok Shop safe zones
- 9:16. Houd **boven en onder 15% vrij** voor de Shop-UI (productkaart, knoppen, caption).
- Zorg dat de **Shop-CTA / product-pin** zichtbaar en logisch in beeld is.
- Hook staat in de **eerste 3 seconden** — tekst-overlay binnen de safe zone.

## 5. 2%-venster-reminder
Nog **${resterend} dagen** tegen 2% commissie (t/m ${eindeNL}). Elke euro omzet nu is
bijna half zo "duur" als na het venster. Prioriteit: volume + snel testen.

${u.complianceBlok(niche.compliance)}
`;

  u.writeFile(path.join(u.clientDir(client), '05-oplevering.md'), doc);
  console.log(`\n  ✓ Oplevering geschreven: clients/${client}/05-oplevering.md  (${assets.length} assets, nog ${resterend}d 2%-venster)\n`);
}

main();
