#!/usr/bin/env node
'use strict';

/**
 * sprint.js — genereert een 30-dagen Launch Sprint-plan voor een klant.
 *
 *   node sprint.js "Merknaam"   (of slug, of mapnaam zoals _demo)
 *
 * Leest clients/<merk>/meta.json en schrijft clients/<merk>/sprint.md:
 * dag-voor-dag, 30 video's (18 cold / 9 retarget / 3 livestream), met
 * productie-milestones, posting-ritme, posttijden NL en de 2%-venster-teller.
 * Alleen Node stdlib.
 */

const path = require('path');
const dates = require('./lib/dates');
const niches = require('./lib/niches');
const u = require('./lib/utils');

function fail(msg) { console.error(`\n  ✗ ${msg}\n`); process.exit(1); }

const N = 30;          // dagen
const N_COLD = 18, N_RETARGET = 9, N_LIVE = 3; // 30 video's

/** Bouw de geordende lijst van 30 video-types (cold front-loaded, live verspreid). */
function buildTypeList() {
  const livePos = new Set([11, 19, 26]); // 0-based slots voor livestream-knipsels
  const types = new Array(N).fill(null);
  let cold = N_COLD, ret = N_RETARGET;
  // Vul eerst 14 cold-slots front-loaded, daarna alterneren tot op.
  let coldBudgetFront = 14;
  for (let i = 0; i < N; i++) {
    if (livePos.has(i)) { types[i] = 'live'; continue; }
    if (coldBudgetFront > 0 && cold > 0) { types[i] = 'cold'; cold--; coldBudgetFront--; continue; }
    // alterneren: retarget krijgt nu voorrang, maar cold-restant ook plaatsen
    if (ret > 0 && (cold === 0 || ret >= cold)) { types[i] = 'retarget'; ret--; }
    else if (cold > 0) { types[i] = 'cold'; cold--; }
    else { types[i] = 'retarget'; ret--; }
  }
  return types;
}

/** Map elke video (postvolgorde) op een kalenderdag (1-based). Posten start dag 4. */
function buildPostDays() {
  const days = [];
  for (let d = 4; d <= N; d++) days.push(d);   // 27 dagen, 1 post elk
  days.push(5, 6, 7);                           // 3 extra cold-doubles vroeg
  days.sort((a, b) => a - b);                   // 30 posts totaal
  return days;
}

const TYPE_LABEL = {
  cold: 'cold 15s',
  retarget: 'retarget 30s',
  live: 'live-knipsel',
};
const TYPE_AUDIENCE = {
  cold: 'koud · brede TOF',
  retarget: 'warm · bekeken/cart',
  live: 'mix · Shop Live',
};

function milestone(day, merknaam) {
  switch (day) {
    case 1: return 'Brief afronden + kickoff. Echte reviews/cijfers verzamelen.';
    case 2: return 'Strategie + 3 hoeken (tegen-narratief) ter goedkeuring.';
    case 3: return 'Persona klaar + Batch 1 (cold A/B/C) goedgekeurd → posten start morgen.';
    case 8: return 'Batch 2 aanleveren + goedkeuren (cold-restant + eerste retarget).';
    case 15: return 'Batch 3 + livestream-knipsels plannen. Tussentijdse hook-check.';
    case 22: return 'Batch 4 (laatste) goedkeuren. Winnende cold-hooks opschalen.';
    case 29: return 'Sprint-review: welke hooks wonnen? Data verzamelen.';
    case 30: return `Oplevering + advies vervolg (Starter/Retainer). Run: node delivery.js "${u.slugify(merknaam)}"`;
    default: return '';
  }
}

function main() {
  const arg = process.argv[2];
  if (!arg) fail('Geef een merknaam/slug op. Voorbeeld:\n     node sprint.js "Bloem Skincare"');

  const client = u.resolveClient(arg);
  if (!client) fail(`Geen klant gevonden voor "${arg}". Run eerst: node new-client.js "${arg}"`);

  const meta = u.readMeta(client);
  const niche = niches.getNiche(meta.niche);
  const start = dates.parseISO(meta.startdatum);
  const eindeISO = meta.venster_einddatum;

  const types = buildTypeList();
  const postDays = buildPostDays();
  const posttijden = niche.posttijdenNL;

  // rows
  const rows = [];
  let postIndex = 0;     // hoeveel video's al gepland
  let vCounter = 0;      // videonummer
  for (let day = 1; day <= N; day++) {
    const date = dates.addDays(start, day - 1);
    const inVenster = dates.daysBetween(dates.parseISO(eindeISO), date) <= 0;
    const vensterDag = dates.daysBetween(start, date) + 1;
    const resterend = dates.dagenResterend(eindeISO, date);
    const teller = inVenster ? `dag ${vensterDag}/90 · nog ${resterend}d 2%` : `⚠ buiten venster (9%)`;

    // welke video's posten vandaag?
    const todays = [];
    while (postIndex < postDays.length && postDays[postIndex] === day) {
      const t = types[postIndex];
      vCounter++;
      todays.push({ v: vCounter, t });
      postIndex++;
    }

    let postCell, audienceCell, tijdCell;
    if (todays.length === 0) {
      postCell = '— (setup)'; audienceCell = '—'; tijdCell = '—';
    } else {
      postCell = todays.map((x) => `V${String(x.v).padStart(2, '0')} ${TYPE_LABEL[x.t]}`).join(' + ');
      audienceCell = todays.map((x) => TYPE_AUDIENCE[x.t]).join(' / ');
      tijdCell = todays.map((_, i) => posttijden[i % posttijden.length]).join(' / ');
    }

    rows.push([
      day,
      dates.nlShort(date),
      teller,
      milestone(day, meta.merknaam) || '—',
      postCell,
      audienceCell,
      tijdCell,
    ]);
  }

  const table = u.mdTable(
    ['Dag', 'Datum', '2%-teller', 'Productie-milestone', 'Post', 'Audience', 'Posttijd NL'],
    rows
  );

  const resterendNu = dates.dagenResterend(eindeISO);
  const doc = `# Sprintplan (30 dagen) — ${meta.merknaam}

**Niche:** ${niche.label} · **Persona:** ${meta.persona}
**Start:** ${dates.nlLong(start)} · **2%-venster t/m:** ${dates.nlLong(dates.parseISO(eindeISO))} (daarna 9%)
**Vandaag:** nog ${resterendNu} dagen 2%-commissie

> Doel: het 2%-venster vol verse, geteste creative draaien. 30 video's:
> ${N_COLD} cold (15s) · ${N_RETARGET} retargeting (30s) · ${N_LIVE} livestream-knipsels.
> Cold is front-loaded om snel een winnende hook te vinden; retargeting schaalt op
> in week 3–4; livestream-knipsels verspreid.

${table}

## Leeswijzer
- **2%-teller:** dag binnen het 90-dagen venster + resterende 2%-dagen vanaf die datum.
- **Post:** Vxx = videonummer. Cold = koude/brede audience; retarget = warme audience
  (bekeken/cart); live-knipsel = uit een TikTok Shop Live geknipt.
- **Posttijd NL:** geoptimaliseerd voor ${niche.label} (rouleert over de dag).
- **Safe zones:** boven/onder 15% vrij houden voor de Shop-UI; Shop-CTA in beeld.

${u.complianceBlok(niche.compliance)}
`;

  u.writeFile(path.join(u.clientDir(client), 'sprint.md'), doc);
  console.log(`\n  ✓ Sprintplan geschreven: clients/${client}/sprint.md  (30 dagen, nog ${resterendNu}d 2%-venster)\n`);
}

main();
