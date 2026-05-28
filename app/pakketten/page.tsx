import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pakketten — AI UGC Studio',
  description: 'Kies het pakket dat past bij jouw groeifase. Vanaf €1.000/maand. TikTok-native UGC voor e-commercemerken.',
}

const CheckIcon = () => (
  <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const DashIcon = () => (
  <svg className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
)

const packages = [
  {
    name: 'Starter',
    price: '€1.000',
    period: '/maand',
    tagline: 'Testfase zonder groot risico',
    highlight: false,
    cta: 'Start nu',
    ctaHref: '/contact',
    features: [
      { label: "15 video's per maand", included: true },
      { label: '3 hook-varianten per concept', included: true },
      { label: 'Vaste AI-persona', included: true },
      { label: 'EU AI Act compliant (AIGC-label)', included: true },
      { label: '1 revisieronde', included: true },
      { label: 'Maandelijkse performance review', included: false },
      { label: 'Productievideo\'s', included: false },
      { label: 'A/B-concepten', included: false },
      { label: 'Contentstrategie', included: false },
    ],
  },
  {
    name: 'Growth',
    price: '€1.750',
    period: '/maand',
    tagline: 'Steady output voor groeiende merken',
    highlight: true,
    badge: 'Meest gekozen',
    cta: 'Start nu',
    ctaHref: '/contact',
    features: [
      { label: "20 video's per maand", included: true },
      { label: "10 productvideo's", included: true },
      { label: '3 hook-varianten per concept', included: true },
      { label: 'Vaste AI-persona', included: true },
      { label: 'EU AI Act compliant (AIGC-label)', included: true },
      { label: '1 revisieronde', included: true },
      { label: 'Maandelijkse performance review', included: true },
      { label: 'A/B-concepten', included: false },
      { label: 'Contentstrategie', included: false },
    ],
  },
  {
    name: 'Launch Sprint',
    price: '€2.500',
    period: 'eenmalig',
    tagline: '30 video\'s in 30 dagen — voor TikTok Shop launch',
    highlight: false,
    badge: 'Tijdelijk',
    cta: 'Boek sprint',
    ctaHref: '/contact',
    features: [
      { label: "30 video's in 30 dagen", included: true },
      { label: '3 hook-varianten per concept', included: true },
      { label: 'Launch-gerichte strategie', included: true },
      { label: 'Vaste AI-persona', included: true },
      { label: 'EU AI Act compliant (AIGC-label)', included: true },
      { label: '2%-venster optimalisatie', included: true },
      { label: 'Maandelijkse performance review', included: false },
      { label: 'A/B-concepten', included: false },
      { label: 'Doorlopende contentstrategie', included: false },
    ],
  },
  {
    name: 'Full Retainer',
    price: '€3.000+',
    period: '/maand',
    tagline: 'Volledig ontzorgd. Schaal zonder plafond.',
    highlight: false,
    cta: 'Neem contact op',
    ctaHref: '/contact',
    features: [
      { label: "40 video's per maand", included: true },
      { label: 'A/B-concepten per campagne', included: true },
      { label: 'Volledige contentstrategie', included: true },
      { label: 'Meerdere AI-personas', included: true },
      { label: 'EU AI Act compliant (AIGC-label)', included: true },
      { label: '2 revisierondes', included: true },
      { label: 'Maandelijkse performance review', included: true },
      { label: 'Upload-management (optioneel)', included: true },
      { label: 'Prioriteits-support', included: true },
    ],
  },
]

export default function PakkettenPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <p className="section-label mb-4">Pakketten</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Kies je schaal.
        </h1>
        <p className="text-neutral-400 text-lg max-w-xl">
          Geen verborgen kosten. Geen lock-in. Opzegbaar per maand.
          Betaald per geleverde batch.
        </p>
      </section>

      {/* Package grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`card relative flex flex-col ${
                pkg.highlight
                  ? 'border-accent shadow-[0_0_60px_rgba(0,255,136,0.1)]'
                  : ''
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-6">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    pkg.highlight
                      ? 'bg-accent text-background'
                      : 'bg-surface-2 text-neutral-300 border border-border'
                  }`}>
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="mb-2">
                <p className={`text-sm font-semibold mb-1 ${pkg.highlight ? 'text-accent' : 'text-neutral-400'}`}>
                  {pkg.name}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black">{pkg.price}</span>
                  <span className="text-neutral-500 text-sm">{pkg.period}</span>
                </div>
                <p className="text-neutral-500 text-xs leading-snug">{pkg.tagline}</p>
              </div>

              <div className="h-px bg-border my-5" />

              <ul className="space-y-3 flex-1 mb-6">
                {pkg.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5">
                    {f.included ? <CheckIcon /> : <DashIcon />}
                    <span className={`text-sm ${f.included ? 'text-neutral-200' : 'text-neutral-600'}`}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={pkg.ctaHref}
                className={pkg.highlight ? 'btn-primary text-sm py-2.5' : 'btn-secondary text-sm py-2.5'}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison note */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center border-t border-border">
        <p className="text-neutral-500 text-sm">
          Alle pakketten inclusief AIGC-labeling, vaste AI-persona, en onboarding-sessie.
          Twijfel je welk pakket past? Start met de{' '}
          <Link href="/audit" className="text-accent hover:underline">betaalde audit (€297)</Link>{' '}
          — wij adviseren dan het beste pakket voor jouw situatie.
        </p>
      </section>

      {/* Paid Audit block */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-surface border border-border rounded-2xl p-8 sm:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label mb-3">Nog niet zeker</p>
              <h2 className="text-3xl font-black mb-4">
                Betaalde audit
                <span className="text-accent"> — €297</span>
              </h2>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Weet in 30 minuten wat jouw TikTok-content mist. Geen verplichtingen.
                Bedrag wordt volledig verrekend als je daarna een pakket afneemt.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '30-min strategie-sessie (video call)',
                  '3 hook-concepten specifiek voor jouw product',
                  'Schriftelijk adviesrapport (PDF)',
                  'Pakketaanbeveling op maat',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm text-neutral-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/audit" className="btn-primary">
                Boek audit voor €297
              </Link>
            </div>
            <div className="bg-surface-2 border border-border rounded-xl p-6">
              <p className="text-sm text-neutral-500 mb-4 uppercase tracking-widest font-semibold text-xs">
                Zo werkt het
              </p>
              <ol className="space-y-5">
                {[
                  { step: '1', title: 'Betaal online', desc: 'Directe bevestiging, direct geplande call.' },
                  { step: '2', title: 'Vul de brief in', desc: '6 vragen over je product, doelgroep en huidige content.' },
                  { step: '3', title: 'Ontvang rapport + call', desc: 'Binnen 48 uur krijg je het rapport. Dan plannen we de call.' },
                ].map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                      <span className="text-accent text-xs font-bold">{s.step}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">{s.title}</p>
                      <p className="text-neutral-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-border">
        <h2 className="text-2xl font-black mb-8">Vragen over pakketten</h2>
        <div className="space-y-6">
          {[
            {
              q: 'Kan ik tussentijds van pakket wisselen?',
              a: 'Ja, dat kan per volgende maand. Opschalen kan ook midden in de maand (pro-rata).',
            },
            {
              q: 'Zit er een minimale looptijd aan?',
              a: 'Nee. Maandelijks opzegbaar. We verdienen ons geld door te presteren, niet door contracten.',
            },
            {
              q: 'Wie is eigenaar van de video\'s?',
              a: 'Jij. Na betaling zijn alle video\'s volledig van jou — onbeperkt te gebruiken op alle platforms.',
            },
            {
              q: 'Werken jullie alleen voor TikTok Shop?',
              a: "Nee, de video's werken ook op Instagram Reels, YouTube Shorts en als Meta-ads. 9:16 is universeel.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-border pb-6">
              <h3 className="font-semibold mb-2 text-sm">{faq.q}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
