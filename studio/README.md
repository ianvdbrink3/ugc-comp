# Studio Operating System — AI UGC voor TikTok Shop NL

Het operationele systeem van de studio. Eén doel: **merken laten winnen op TikTok
Shop NL** met native, converterende creative — en per klant in minuten van
**brief → strategie → scripts → batch → oplevering** gaan.

> **Scope:** uitsluitend TikTok Shop NL. Geen Meta, bol, Shopify of ander kanaal.
> **De kern:** het **2%-venster** — TikTok Shop rekent 2% commissie de eerste 90
> dagen, daarna 9%. Elke deliverable is daarop afgestemd.
>
> De portfolio-site (Next.js) staat los in de repo-root en hoort niet bij dit OS.

---

## Snelstart

```bash
cd studio

# 1. Nieuwe klant scaffolden  (niche + startdatum optioneel)
node new-client.js "Merknaam" beauty 2026-06-15

# 2. 30-dagen sprintplan genereren (gekoppeld aan het 2%-venster)
node sprint.js "Merknaam"

# 3. Oplevering genereren uit de /assets-map
node delivery.js "Merknaam"
```

Geen dependencies. Draait op kale Node (alleen stdlib: `fs`, `path`).
Niches: `beauty` · `supplementen` · `fashion` · `home-gadget` · `fitness`
(vrije invoer wordt genormaliseerd; default `beauty`).

---

## Mapstructuur

```
studio/
├── lib/                  gedeelde helpers (geen deps)
│   ├── dates.js          2%-venster-rekenen, NL-datums
│   ├── niches.js         per niche: hoeken, persona, compliance, posttijden
│   └── utils.js          slug, meta.json, md-tabellen, AI-disclosure
├── prompts/              TikTok-Shop-getunede Claude-prompts (00–06)
├── templates/            onboarding-brief, sprint-planner, contract-light,
│                         launch-sprint-aanbod
├── outreach/             loom-script, mail-templates, timing
├── clients/
│   └── _demo/            volledig uitgewerkt fictief merk (Bloesem Skincare)
├── new-client.js         scaffold
├── sprint.js             30-dagen sprintgenerator
├── delivery.js           oplever-generator
└── README.md
```

---

## Workflow per klant (4 fasen)

| Fase | Wat | Hulpmiddel |
|------|-----|-----------|
| 1. Onboarding | Brief invullen incl. echte reviews + TikTok Shop-status | `00-brief.md` (uit `templates/onboarding-brief.md`) |
| 2. Hoek-research | 3 hoeken + tegen-narratief + shotlist | `prompts/01-hoek-research.md` → `01-strategie.md` |
| 3. Persona | Eén consistent AI-gezicht per niche (AIGC-gelabeld) | `prompts/02-persona-creatie.md` → `03-persona.md` |
| 4. Batch | Cold (15s) + retarget (30s) genereren | `prompts/03` & `04` → `02-scripts.md`, assets in `/assets` |
| + Planning | 30-dagen sprint gekoppeld aan venster | `node sprint.js` → `sprint.md` |
| + Oplevering | Inventaris + A/B + posttijden + disclosure | `node delivery.js` → `05-oplevering.md` |

---

## Asset-naamconventie (voor `delivery.js`)

```
V<nr>_<type>_<lengte>_<hook>.mp4
```
- `nr` = 01–30 · `type` = `cold` | `retarget` | `live` · `lengte` = `15s` | `30s`
- voorbeeld: `V01_cold_15s_minder-is-meer.mp4`

`delivery.js` leest `/assets`, bouwt de inventaris, A/B-advies, posttijden NL,
safe zones en de 2%-venster-reminder. Bestanden die afwijken worden best-effort
ingelezen.

---

## `meta.json` (per klant, automatisch)

```json
{
  "merknaam": "...", "slug": "...", "niche": "beauty",
  "persona": "lisa_skincare_01", "pakket": "Launch Sprint",
  "startdatum": "2026-06-15",
  "sprint_einddatum": "2026-07-15",
  "venster_einddatum": "2026-09-13",
  "commissie_9pct_vanaf": "2026-09-13"
}
```

---

## Compliance (overal ingebouwd)
- **EU AI Act Art. 50:** alle content AIGC-gelabeld; persona's volledig synthetisch.
- **Geen verzonnen reviews/aantallen** (ACM/Reclamecode) — alleen onderbouwde input.
- **Geen verboden gezondheidsclaims** (NVWA) bij supplementen/cosmetica.
Elke gegenereerde `sprint.md` en `05-oplevering.md` bevat een compliance-blok + disclosure.

---

## Demo
`clients/_demo/` is een volledig uitgewerkt fictief merk (Bloesem Skincare): ingevulde
brief, strategie met tegen-narratief, 3 cold + 2 retarget scripts (shot-voor-shot),
persona, 30-dagen sprint en voorbeeld-oplevering. Bekijk dat als referentie.
