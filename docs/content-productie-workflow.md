# Content Productie Workflow
## AI UGC Studio — Fase-voor-fase draaiboek

*Gebruik dit document voor elke klantbatch. Vul de variabelen in en doorloop de 4 fasen.*

---

## FASE 1 — Onboarding & Briefing

**Input nodig:** Ingevulde `client-onboarding-brief.md`

### Stap 1.1 — Review brief
Lees de brief door en noteer:
- [ ] Product is visueel demonstreerbaar? (Zo nee: overleg met klant)
- [ ] Echte reviews aangeleverd? (Minimaal 3)
- [ ] Doelgroep specifiek genoeg? (Leeftijd + pijn + verlangen)
- [ ] Doel voor de komende 30 dagen is concreet?

### Stap 1.2 — Review extraheren
Ga door de aangeleverde reviews en highlight:
- De sterkste **resultaatclaims** (bv. "na 2 weken was mijn huid...")
- De meest genoemde **pijnpunten** (voor het product)
- De meest genoemde **verlangens** (wat klanten wilden bereiken)
- **Verrassende voordelen** die de klant zelf niet noemde

---

## FASE 2 — Strategie & Hoeken

### Stap 2.1 — Angle Research Prompt (kopieer naar Claude)

```
Klant: [MERKNAAM]
Product: [PRODUCTNAAM + 2-zin beschrijving]
Doelgroep: [LEEFTIJD, GESLACHT, PIJN, VERLANGEN]
Prijs: €[PRIJS]
Reviews (echt, aangeleverd door klant):
[PLAK REVIEWS]

Taak:
1. Vind 3 winnende UGC-hoeken op basis van bovenstaande data
2. Schrijf 5 hook-varianten per hoek:
   - "Ik was [X] jaar oud toen ik eindelijk begreep dat [CLAIM]"
   - "Stop scrollend als je ooit [PIJN] hebt gehad"
   - "POV: je hebt eindelijk [VERLANGEN] gevonden"
   - "Dit product van €[PRIJS] verving mijn [DUUR ALTERNATIEF] van €[X]"
   - "Hoe mijn [DOELGROEP] veranderde na 1 week [PRODUCT]"
3. Identificeer het tegen-narratief: wat zegt de markt, wat zeggen wij ertegenin?
4. Lever een shotlist per hoek (opening / actie / slot / tekst-overlay / audio)

Regels:
- ALLEEN claims die aantoonbaar zijn op basis van aangeleverde reviews
- Geen nep-statistieken, geen verzonnen testimonials
- Hooks moeten in de eerste 1.5 seconde werken op TikTok
```

### Stap 2.2 — Selectie
Kies de 3 sterkste hoeken. Stuur ter goedkeuring naar de klant.
Wacht op go-ahead voor productie.

---

## FASE 3 — AI-Persona Aanmaken ("Soul Character")

### Stap 3.1 — Persona Prompt (kopieer naar Midjourney/Gemini)

```
Maak een consistente UGC-persona voor [NICHE]:

Label: [bv. lisa_beauty_01]
Leeftijd: [bv. 26]
Look: [beschrijving — bv. lichte huid, donkerblond haar, casual stijl]
Garderobe: neutrale tinten, geen logo's zichtbaar
Setting: natuurlijk daglicht, neutrale achtergrond
Expressies te genereren: verrast, bezorgd, tevreden, enthousiast

Genereer 4 referentieshots:
1. Selfie — camera, neutrale achtergrond
2. Mid-shot met product in hand
3. Side-profile tijdens gebruik
4. Close-up gezicht (reactie-shot)

Bewaar alle shots onder label [LABEL] voor hergebruik in volgende batches.

BELANGRIJK (EU AI Act Art. 50):
- Gebruik GEEN echte persoon als basis
- Persona moet duidelijk synthetisch zijn indien nader bekeken
- Alle video's worden gelabeld als AIGC bij upload
```

### Stap 3.2 — Persona opslaan
Sla de 4 referentieshots op in `/personas/[LABEL]/` voor hergebruik.

---

## FASE 4 — Video Batch Generatie

### Stap 4.1 — Batch Prompt (kopieer naar Higgsfield/Kling/Runway)

```
Genereer 5 UGC-video's voor [PRODUCTNAAM] met persona "[LABEL]".

Specs: 9:16 verticaal, 15–30 seconden, UGC-preset, iPhone-aesthetiek

VIDEO 1 — HOOK A:
  Opening (0–1.5s): [persona reageert op probleem — bv. kijkt gefrustreerd naar spiegel]
  Actie (1.5–20s): [product pakken, uitleg, gebruik tonen]
  Slot (20–30s): [resultaat / reactie / CTA]
  Tekst-overlay: "[HOOK TEKST]"
  Voice-over: "[EXACTE TEKST — alleen aantoonbare claims]"

VIDEO 2 — HOOK B:
  [idem — andere hoek]

VIDEO 3 — HOOK C:
  [idem — andere hoek]

VIDEO 4 — VERGELIJKING:
  Opening: [persona met oud product / probleem]
  Actie: [overstap naar nieuw product]
  Slot: [voor/na of reactie]
  Tekst-overlay: "Voor vs. Na [X weken]"

VIDEO 5 — TESTIMONIAL STIJL:
  Opening: [persona kijkt direct in camera]
  Actie: [persoonlijk verhaal, productgebruik]
  Slot: [aanbeveling]

Stijl-instructies:
- iPhone-aesthetiek: lichte camera-shake, imperfecte framing, authentiek
- Licht: natuurlijk daglicht of warm binnen-licht
- Geen stockfoto-look, geen studio-belichting
- Genereer parallel. Lever downloadlinks.
```

### Stap 4.2 — Review & revisie
- [ ] Alle claims controleren op basis van aangeleverde reviews
- [ ] Geen nep-resultaten, geen verzonnen aantallen
- [ ] AIGC-label zichtbaar of klaar voor TikTok AIGC-toggle
- [ ] Aspect ratio 9:16 correct?
- [ ] Duurtijd binnen 15–30 seconden?

### Stap 4.3 — Levering
- Video's aanleveren via WeTransfer of Google Drive (map per batch)
- Meeleveren: uploadgids met AIGC-toggle instructie
- Factuur versturen na levering

---

## Tijdlijn per batch

| Dag | Actie |
|-----|-------|
| Dag 1 | Brief ontvangen en reviewen |
| Dag 2 | Angle research + hoeken sturen ter goedkeuring |
| Dag 3 | Goedkeuring ontvangen, persona aanmaken of ophalen |
| Dag 4–5 | Video's genereren |
| Dag 6 | Review intern — claims checken |
| Dag 7 | Levering aan klant |

---

## Compliance checklist (elke batch)

- [ ] Alle claims aantoonbaar via aangeleverde reviews
- [ ] Geen fake reviews of nep-statistieken gebruikt
- [ ] AI-persona is niet gebaseerd op echte herkenbare persoon
- [ ] AIGC-label is meegegeven of TikTok AIGC-toggle staat aan
- [ ] Spec-work (portfolio) is gelabeld als "Concept"

---

## Tools per stap

| Stap | Tool |
|------|------|
| Angle research & scripts | Claude (desktop) |
| Persona generatie | Midjourney / Gemini |
| Video generatie | Higgsfield / Kling / Runway |
| Opslag | Google Drive (map per klant) |
| Levering | WeTransfer / Drive-link |
| Facturatie | Moneybird / e-mail factuur |
