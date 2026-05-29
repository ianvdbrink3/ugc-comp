#!/usr/bin/env node
'use strict';

/**
 * new-client.js — scaffold een nieuwe TikTok Shop-klant.
 *
 *   node new-client.js "Merknaam" [niche] [startdatum YYYY-MM-DD]
 *
 * Maakt clients/<slug>/ met ingevulde templates, /assets en meta.json met het
 * berekende 2%-venster. Overschrijft een bestaande klant niet.
 * Alleen Node stdlib.
 */

const fs = require('fs');
const path = require('path');
const dates = require('./lib/dates');
const niches = require('./lib/niches');
const u = require('./lib/utils');

const LAUNCH_NL = '2026-06-15'; // TikTok Shop NL live

function fail(msg) {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

function main() {
  const [, , naamArg, nicheArg, startArg] = process.argv;
  if (!naamArg) {
    fail('Geef een merknaam op. Voorbeeld:\n     node new-client.js "Bloem Skincare" beauty 2026-06-15');
  }

  const merknaam = naamArg.trim();
  const slug = u.slugify(merknaam);
  const nicheKey = niches.normaliseerNiche(nicheArg);
  const niche = niches.NICHES[nicheKey];

  // Startdatum: arg > anders de launchdatum als die nog moet komen, anders vandaag.
  let startISO;
  if (startArg) {
    dates.parseISO(startArg); // valideert
    startISO = startArg;
  } else {
    const vandaag = dates.today();
    const launch = dates.parseISO(LAUNCH_NL);
    startISO = dates.toISO(vandaag.getTime() < launch.getTime() ? launch : vandaag);
  }

  const dir = u.clientDir(slug);
  if (fs.existsSync(path.join(dir, 'meta.json'))) {
    fail(`Klant "${slug}" bestaat al (clients/${slug}/). Niets overschreven.`);
  }

  const venster = dates.vensterVan(startISO);
  const sprintEinde = dates.addDays(venster.start, 30);

  const meta = {
    merknaam,
    slug,
    niche: nicheKey,
    nicheLabel: niche.label,
    persona: niche.personaLabel,
    pakket: 'Launch Sprint',
    startdatum: startISO,
    sprint_einddatum: dates.toISO(sprintEinde),
    venster_einddatum: venster.eindeISO,
    commissie_9pct_vanaf: venster.commissie9pctVanafISO,
    aangemaakt_op: dates.toISO(dates.today()),
  };

  // /assets
  u.ensureDir(path.join(dir, 'assets'));
  u.writeIfAbsent(path.join(dir, 'assets', '.gitkeep'), '');

  // meta.json
  u.writeMeta(slug, meta);

  // 00-brief.md — onboarding-template, vooringevuld met merknaam.
  const briefTpl = fs.readFileSync(path.join(u.studioRoot(), 'templates', 'onboarding-brief.md'), 'utf8');
  const brief = briefTpl
    .replace('**Merknaam:** _______________', `**Merknaam:** ${merknaam}`)
    .replace('**Datum:** _______________', `**Datum:** ${meta.aangemaakt_op}`);
  u.writeIfAbsent(path.join(dir, '00-brief.md'), brief);

  // 01-strategie.md
  u.writeIfAbsent(path.join(dir, '01-strategie.md'), strategieTpl(meta, niche));
  // 02-scripts.md
  u.writeIfAbsent(path.join(dir, '02-scripts.md'), scriptsTpl(meta, niche));
  // 03-persona.md
  u.writeIfAbsent(path.join(dir, '03-persona.md'), personaTpl(meta, niche));
  // 04-batch.md
  u.writeIfAbsent(path.join(dir, '04-batch.md'), batchTpl(meta, niche));
  // 05-oplevering.md — placeholder tot delivery.js draait
  u.writeIfAbsent(path.join(dir, '05-oplevering.md'),
    `# Oplevering — ${merknaam}\n\n*Nog niet gegenereerd. Vul /assets en run:* \`node delivery.js "${slug}"\`\n`);
  // sprint.md — placeholder tot sprint.js draait
  u.writeIfAbsent(path.join(dir, 'sprint.md'),
    `# Sprintplan — ${merknaam}\n\n*Nog niet gegenereerd. Run:* \`node sprint.js "${slug}"\`\n`);

  const resterend = dates.dagenResterend(venster.eindeISO);
  console.log(`
  ✓ Klant aangemaakt: clients/${slug}/

    Merk         ${merknaam}
    Niche        ${niche.label}  (persona: ${niche.personaLabel})
    Start        ${dates.nlLong(venster.start)}
    2%-venster   t/m ${dates.nlLong(venster.einde)}  →  daarna 9%
    Sprint       30 dagen, t/m ${dates.nlLong(sprintEinde)}
    Status       nog ${resterend} dagen 2%-commissie

  Bestanden: 00-brief · 01-strategie · 02-scripts · 03-persona · 04-batch · 05-oplevering · sprint · /assets

  Volgende stap:
    1. Vul 00-brief.md in met de klant (incl. echte reviews).
    2. Run: node sprint.js "${slug}"     → 30-dagen plan
    3. Werk 01→04 uit met de prompts in /prompts.
    4. Zet assets in /assets en run: node delivery.js "${slug}"
`);
}

// ---- per-klant template-content ---------------------------------------------

function strategieTpl(meta, niche) {
  return `# 01 — Strategie & hoeken — ${meta.merknaam}

*Niche: ${niche.label}. Gebruik prompt /prompts/01-hoek-research.md. 2%-venster t/m ${meta.venster_einddatum}.*

## Tegen-narratief (de scherpste hoek)
Wat roept iedereen in deze niche op TikTok? En welke geloofwaardige omkering wint daarvan?
> Consensus: ...
> Onze omkering: ...

## 3 winnende hoeken
| # | Hoek | Kernbelofte (onderbouwd) | Waarom scroll-stop (eerste 3s) | Type |
|---|------|--------------------------|-------------------------------|------|
| 1 | ... | ... | ... | cold 15s |
| 2 | ... | ... | ... | cold 15s |
| 3 | ... | ... | ... | retarget 30s |

## Niche-richtingen om uit te putten
${niche.hoekrichtingen.map((h) => `- ${h}`).join('\n')}

## 5 hook-varianten (NL, voor tekst-overlay binnen safe zones)
1. "Ik was vandaag jaren oud toen ik ontdekte dat ..."
2. "Stop met scrollen als je ..."
3. "POV: je hebt eindelijk ... gevonden"
4. "Dit product van €... verving mijn routine van €..."
5. "Hoe mijn [doelgroep] veranderde na 1 week ..."

## Compliance
- Alleen onderbouwde claims uit de brief. ${niche.compliance}
`;
}

function scriptsTpl(meta, niche) {
  return `# 02 — Scripts — ${meta.merknaam}

*3 cold (15s) + retargeting (30s). Shot-voor-shot. Gebruik /prompts/03 en /prompts/04.*
*Persona: ${niche.personaLabel}. Safe zones: boven/onder 15% vrij.*

## COLD — HOOK A (15s)
- **Hook (0–3s):** ...
- **Midden (3–10s):** ...
- **Slot (10–15s):** ... + Shop-CTA
- **Tekst-overlays:** ...
- **Voice-over:** ... (alleen onderbouwde claims)
- **Camera:** ...

## COLD — HOOK B (15s)
- **Hook (0–3s):** ... (tegen-narratief)
- ...

## COLD — HOOK C (15s)
- **Hook (0–3s):** ...
- ...

## RETARGET — 30s (objectie wegnemen)
- **Hook (0–3s):** "Twijfel je nog of ..."
- **Objectie (3–12s):** ...
- **Bewijs (12–22s):** onderbouwd reviewcitaat / demo
- **Slot (22–30s):** zachte urgentie (2%-venster) + Shop-CTA

## Compliance
${niche.compliance} Geen valse schaarste. AIGC-label bij upload.
`;
}

function personaTpl(meta, niche) {
  return `# 03 — Persona — ${meta.merknaam}

*Gebruik /prompts/02-persona-creatie.md. Eén consistent gezicht, hergebruikt over alle video's.*

- **Label:** ${niche.personaLabel}
- **Leeftijd:** ${niche.personaLeeftijd}
- **Look:** ...
- **Garderobe:** neutrale tinten, geen logo's
- **Setting:** natuurlijk daglicht, authentiek interieur
- **Tone:** [past bij merk-tone uit de brief]
- **Expressies:** verrast, twijfelend, tevreden, enthousiast

**Referentieshots (in /assets):** selfie · mid-shot met product · side-profile gebruik · close-up reactie

## EU AI Act Art. 50
Volledig synthetisch, geen echte herkenbare persoon als basis. Alle video's
AIGC-gelabeld met zichtbare AI-vermelding.
`;
}

function batchTpl(meta, niche) {
  return `# 04 — Batch-checklist — ${meta.merknaam}

*Voor elke batch aflopen. Persona: ${niche.personaLabel}.*

- [ ] Strategie (01) en scripts (02) goedgekeurd door klant
- [ ] Persona-referenties (03) in /assets
- [ ] Cold (15s): HOOK A/B/C gegenereerd — 9:16, 12–15s, hook in 3s
- [ ] Retarget (30s): 2–3 objectie-varianten gegenereerd
- [ ] Tekst-overlays binnen safe zones (boven/onder 15% vrij)
- [ ] Voice-over: alleen onderbouwde claims — ${niche.compliance}
- [ ] Geen valse schaarste / geen verboden gezondheidsclaims
- [ ] Bestanden in /assets met duidelijke namen (zie delivery.js conventie)
- [ ] AIGC-label klaar voor upload
- [ ] Run: \`node delivery.js "${meta.slug}"\`
`;
}

main();
