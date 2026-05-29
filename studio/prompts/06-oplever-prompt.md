# 06 — Oplever-prompt (genereert het oplever-document)

*Gebruik dit als je de oplevering handmatig in Claude wilt schrijven. Voor automatische generatie: `node delivery.js "<merk>"` (leest de assets-map en meta.json).*

```
Schrijf een nette, zakelijke oplevering (NL) voor [MERK] — een batch TikTok Shop-
creative. Gebruik onderstaande asset-lijst.

Assets:
[PLAK LIJST: bestandsnaam | format | lengte | hook-type (cold/retarget) | hook-tekst]

2%-venster: loopt tot [DATUM] — nog [X] dagen 2%-commissie.

Lever:
1. ASSET-INVENTARIS — tabel: bestand, format, lengte, hook-type, aanbevolen gebruik
   (cold vs retarget, welke audience).
2. A/B-TESTADVIES — welke hook tegen welke audience; wat eerst testen om snel een
   winnaar te vinden binnen het venster.
3. POSTING-ADVIES — optimale posttijden NL voor deze niche; welke dag welke variant.
4. TIKTOK SHOP SAFE ZONES — herinnering: boven/onder 15% vrij voor de Shop-UI;
   product-pin / Shop-tab CTA in beeld.
5. 2%-VENSTER-REMINDER — nog [X] dagen; advies om het venster vol te draaien.
6. AI-DISCLOSURE — standaardregel onderaan (EU AI Act Art. 50): AIGC-toggle aan,
   zichtbare AI-vermelding.

Toon: nuchter, concreet, geen fluff. Alleen onderbouwde claims.
```
