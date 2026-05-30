#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

// ── Config ──────────────────────────────────────────────────────────────────
const PROSPECTS_FILE = path.join(__dirname, 'batch-01', 'prospects.md')
const OUTPUT_DIR     = path.join(__dirname, 'batch-01')
const TODAY          = new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' })

// TikTok Shop NL 2%-venster: loopt tot ~90 dagen na lancering (15 jun 2026)
const VENSTER_EINDE  = '13 september 2026'

// ── Parser ───────────────────────────────────────────────────────────────────
function parseProspects(md) {
  const blocks = md.split(/^---$/m).map(b => b.trim()).filter(Boolean)
  const prospects = []

  for (const block of blocks) {
    // Skip instructie-blok (geen "Merknaam:" veld)
    if (!block.includes('**Merknaam:**')) continue
    // Skip voorbeeld-blok met "(fictief" in de header
    // We include the voorbeeld — the user can delete it if they want
    const p = {}
    const field = (label) => {
      const re = new RegExp(`\\*\\*${label}:\\*\\*[ \\t]*(.+)`)
      const m = block.match(re)
      return m ? m[1].trim() : ''
    }
    p.merknaam     = field('Merknaam')
    p.website      = field('Website')
    p.contact      = field('LinkedIn / contactmail')
    p.contactnaam  = field('Contactnaam')
    p.niche        = field('Niche') || 'beauty'
    p.product      = field('Product dat ze pushen')
    p.zwakpunt     = field('Zwak punt in huidige creative')

    // Skip lege slots (merknaam niet ingevuld)
    if (!p.merknaam) continue

    prospects.push(p)
  }
  return prospects
}

// ── Hook-generator op basis van niche + product ───────────────────────────
function generateHooks(p) {
  const prod  = p.product || `jullie product`
  const niche = p.niche.toLowerCase()

  // Prijs extraheren als aanwezig (bv. "Vitamine C serum €34,95")
  const prijsMatch = prod.match(/€(\d+[,.]?\d*)/)
  const prijs      = prijsMatch ? prijsMatch[0] : '€29,95'
  const hoog       = prijsMatch ? `€${Math.round(parseFloat(prijsMatch[1].replace(',', '.')) * 2.5)}` : '€69,95'

  const productKort = prod.replace(/€[\d,.]*/g, '').trim().replace(/\s+/g, ' ')

  const hookSets = {
    beauty: [
      `"Ik was jaren oud toen ik doorhad dat mijn huid geen 10 producten nodig had — alleen ${productKort.split(' ').slice(0,3).join(' ')}"`,
      `"Stop scrollend als je ook serums van ${hoog} hebt gekocht die niks deden"`,
      `"Dit product van ${prijs} verving drie dingen op mijn badkamerplank"`,
    ],
    supplementen: [
      `"POV: je hebt eindelijk energie zonder 3 koppen koffie — dankzij ${productKort.split(' ').slice(0,3).join(' ')}"`,
      `"Stop scrollend als je 's ochtends opstaat en je al moe bent"`,
      `"${prijs} per maand vs. ${hoog} aan losse supplementen — dit is wat ik doe"`,
    ],
    fashion: [
      `"Hoe ik voor ${prijs} lijk alsof ik het dubbele heb uitgegeven"`,
      `"Stop scrollend als je elke ochtend denkt: ik heb niks om aan te trekken"`,
      `"Dit stuk van ${prijs} combineer ik 5 verschillende manieren — hier zijn ze"`,
    ],
    'home-gadget': [
      `"Ik wist niet dat ik dit nodig had totdat ik het had — ${productKort.split(' ').slice(0,3).join(' ')}"`,
      `"Stop scrollend als je ook te veel tijd kwijt bent aan [PIJN VAN DOELGROEP]"`,
      `"${prijs} en mijn [ROUTINE] is 10 minuten korter geworden — echt"`,
    ],
    fitness: [
      `"Hoe ik in 4 weken meer progressie maakte dan in het hele jaar ervoor"`,
      `"Stop scrollend als je ook traint maar de resultaten uitblijven"`,
      `"${prijs} vs. een personal trainer van ${hoog} per maand — dit werkt beter voor mij"`,
    ],
  }

  return hookSets[niche] || hookSets['beauty']
}

// ── Zwakpunt → diagnose-tekst ────────────────────────────────────────────────
function zwakpuntToDiagnose(zwakpunt) {
  const z = zwakpunt.toLowerCase()
  if (z.includes('statisch') || z.includes('foto'))
    return `Ik zie dat jullie content voornamelijk stilstaande productfoto's zijn. Op TikTok stopt niemand bij een statisch beeld — de eerste 2 seconden moeten beweging hebben. Jullie missen daardoor de scroll-stop die je nodig hebt.`
  if (z.includes('logo') || z.includes('geen hook') || z.includes('opening'))
    return `De video's beginnen met jullie logo of productnaam in beeld. Maar op TikTok heeft een kijker al gescrolld vóórdat jij je merk hebt genoemd. Je hebt 1.5 seconde — en die moet een prikkel zijn, geen introductie.`
  if (z.includes('volume') || z.includes('weinig') || z.includes('posten'))
    return `Jullie content-volume is laag — 2 à 3 posts per week. Op TikTok Shop is het een volumespel. Merken die 15–20 video's per maand testen, vinden hun winnende hook structureel sneller. Met weinig volume test je niks.`
  if (z.includes('gelikt') || z.includes('studio') || z.includes('productie'))
    return `De content heeft een gelikte productie-look — mooie belichting, strakke cuts. Dat werkt op Instagram. Maar op TikTok converteert "shot-on-iPhone-gevoel" beter. Mensen scrollen weg als het te gelikt is — het triggert hun ad-radar.`
  // Fallback: gebruik het zwakpunt letterlijk
  return `Wat ik zie: ${zwakpunt}. Op TikTok kost dit je de scroll-stop in de eerste 1.5 seconde — en daarmee de klik.`
}

// ── Loom-script generator ────────────────────────────────────────────────────
function generateLoomScript(p) {
  const naam     = p.contactnaam ? p.contactnaam.split(' ')[0] : 'daar'
  const hooks    = generateHooks(p)
  const diagnose = zwakpuntToDiagnose(p.zwakpunt)
  const prod     = p.product || 'jullie product'

  return `# Loom Script — ${p.merknaam}
## Opnamedatum: ${TODAY} | Duur: ~2:00

> **Voor je begint:** Open de TikTok-pagina of Meta Ad Library van ${p.merknaam} op je scherm.
> Camera klein rechtsboven. Geen slides. Praat zoals tegen een slimme vriend.

---

## [0:00 — 0:10] Opening

"Hé ${naam}, ik ben Ian — ik maak AI-gegenereerde UGC voor TikTok Shop merken.
Ik keek even naar jullie content bij ${p.merknaam} en ik wil je in 2 minuten laten zien wat ik zie."

*(Zet cursor op hun TikTok of Meta Ad Library)*

---

## [0:10 — 0:45] Diagnose — het concrete probleem

"${diagnose}

En dat is zonde — want jullie product, ${prod}, heeft de ruwe kracht om het wél te laten werken op TikTok Shop."

---

## [0:45 — 1:30] 3 concrete hooks voor ${p.merknaam}

"Hier zijn 3 hooks die ik morgen zou kunnen maken voor ${prod}, gebaseerd op wat ik zie werken in ${p.niche}:"

**Hook 1:**
${hooks[0]}

*(Schrijf de hook als aantekening in Loom terwijl je het uitspreekt)*

**Hook 2:**
${hooks[1]}

*(Schrijf ook deze op)*

**Hook 3:**
${hooks[2]}

*(Schrijf ook deze op)*

"Elk van deze hooks is gemaakt om in de eerste 1.5 seconde de scroll te stoppen. Daarna pas vertel je wat het product is."

---

## [1:30 — 1:50] Resultaat + tijdsdruk

"Als we deze drie testen met een vaste AI-persona in jullie niche,
weten jullie binnen 2 weken welke hook converteert op TikTok Shop NL.

En dat timen we bewust: TikTok Shop NL rekent de eerste 90 dagen 2% commissie — daarna 9%.
Dat venster loopt tot ${VENSTER_EINDE}. Merken die nu volume opbouwen, hebben daarna een structureel voordeel.
Die data is van jullie, ongeacht wat er daarna gebeurt."

---

## [1:50 — 2:00] CTA

"Ik produceer de eerste 5 video's gratis. Presteren ze, praten we over een retainer.
Presteren ze niet — je hebt niks betaald en je hebt wél data.

Eén reply is genoeg. Ik stuur je dezelfde dag de brief."

---

*[Loom-link invullen na opname en plakken in email.md]*
`
}

// ── Email generator ──────────────────────────────────────────────────────────
function generateEmail(p) {
  const naam = p.contactnaam ? p.contactnaam.split(' ')[0] : 'daar'

  return `# Follow-up mail — ${p.merknaam}
## Verstuur: 3 dagen na de Loom (als geen reactie)

---

**Aan:** ${p.contact || '[e-mail invullen]'}
**Onderwerp:** 3 ideeën voor ${p.merknaam} op TikTok Shop

---

Hoi ${naam},

Stuurde je vorige week een korte video met 3 UGC-concepten voor jullie content: [LOOM-LINK]

Samenvatting in 1 zin: jullie content heeft de juiste producten maar mist de hook die iemand laat stoppen op TikTok Shop.

Eerste 5 video's maak ik gratis. Eén reply is genoeg.

Ian
AI UGC Studio
iandepian@gmail.com
`
}

// ── Tracker-rij generator ────────────────────────────────────────────────────
function generateTrackerRow(p) {
  return `# Tracker-rij — ${p.merknaam}
## Plak in docs/studio-docs.html → Prospect Tracker

| Merknaam | Niche | Score | Loom verstuurd | Status | Notitie |
|----------|-------|-------|----------------|--------|---------|
| ${p.merknaam} | ${p.niche} | ⚡ Warm | ${TODAY} | Loom verstuurd | ${p.product || ''} |
`
}

// ── Main ─────────────────────────────────────────────────────────────────────
function main() {
  if (!fs.existsSync(PROSPECTS_FILE)) {
    console.error(`Bestand niet gevonden: ${PROSPECTS_FILE}`)
    process.exit(1)
  }

  const md         = fs.readFileSync(PROSPECTS_FILE, 'utf8')
  const prospects  = parseProspects(md)

  if (prospects.length === 0) {
    console.log('Geen ingevulde merken gevonden. Vul eerst outreach/batch-01/prospects.md in.')
    process.exit(0)
  }

  console.log(`\n🎬 gen-outreach.js — ${prospects.length} merk(en) gevonden\n`)

  for (const p of prospects) {
    const slug    = p.merknaam.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const merkDir = path.join(OUTPUT_DIR, slug)
    fs.mkdirSync(merkDir, { recursive: true })

    fs.writeFileSync(path.join(merkDir, 'loom-script.md'),  generateLoomScript(p),  'utf8')
    fs.writeFileSync(path.join(merkDir, 'email.md'),         generateEmail(p),       'utf8')
    fs.writeFileSync(path.join(merkDir, 'tracker-row.md'),   generateTrackerRow(p),  'utf8')

    console.log(`  ✓ ${p.merknaam}  →  outreach/batch-01/${slug}/`)
  }

  console.log(`\n✅ Klaar. ${prospects.length} map(pen) aangemaakt in outreach/batch-01/\n`)
  console.log('Volgende stap: open elk loom-script.md en neem op met Loom.\n')
}

main()
