# AI UGC Studio

TikTok-native AI UGC voor e-commercemerken. Deze repo bevat twee onderdelen:

| Onderdeel | Map | Wat |
|-----------|-----|-----|
| **Portfolio-site** | `/` (`app/`, `components/`) | Next.js 14 marketing-site (zie hieronder) |
| **Studio Operating System** | [`studio/`](studio/) | Operationeel systeem om per klant van brief → strategie → scripts → batch → oplevering te gaan, getuned op het 2%-venster van TikTok Shop NL. Zie [`studio/README.md`](studio/README.md). |

## Portfolio-site

### Deployment (Vercel — 2 minuten)

### Optie A: Via Vercel dashboard (aanbevolen)
1. Ga naar [vercel.com/new](https://vercel.com/new)
2. Klik **"Import Git Repository"**
3. Selecteer `ianvdbrink3/ugc-comp`
4. Branch: `claude/quirky-cannon-pBxT3` (of merge naar `main`)
5. Klik **Deploy** — Vercel detecteert Next.js automatisch

### Optie B: Via Vercel CLI (lokaal)
```bash
npm install -g vercel
vercel login
cd /pad/naar/ugc-comp
vercel --prod
```

## Lokaal draaien

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Pagina's

| Route | Beschrijving |
|-------|-------------|
| `/` | Homepage — hero, stats, how-it-works, pakketten, FAQ |
| `/pakketten` | Vergelijkingstabel, Growth = aanbevolen, audit-blok |
| `/audit` | Landingspagina €297 betaalde audit |
| `/werk` | Portfolio grid met niche-filter (Beauty/Gadget/Fashion) |
| `/contact` | Intake-formulier (gratis pilot of betaalde audit) |
| `/privacy` | Privacybeleid (AVG-compliant) |
| `/algemene-voorwaarden` | Algemene voorwaarden |

## Business docs

Zie `/docs/`:
- `loom-audit-script.md` — 2-min Loom-script met timing-markers
- `performance-review-template.md` — Maandelijkse klantrapportage
- `client-onboarding-brief.md` — 6-vragen intake voor nieuwe klanten
- `pilot-proposal-email.md` — Email-templates (gratis pilot, betaalde audit, follow-up)

## Na deployment

1. **Contactformulier** — wire `/app/contact/page.tsx` aan Formspree of Resend voor echte e-mailontvangst
2. **Video's** — vervang placeholder-cards in `/werk` door echte `<video src="/werk/video-naam.mp4" />` tags
3. **E-mail** — `iandepian@gmail.com` staat al ingesteld in Footer en docs
