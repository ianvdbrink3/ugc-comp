import Link from 'next/link'

const stats = [
  { value: '15+', label: "video's per maand" },
  { value: '3x', label: 'hook-varianten per concept' },
  { value: '100%', label: 'EU AI Act compliant' },
  { value: 'Dag 1', label: 'TikTok Shop ready' },
]

const steps = [
  {
    number: '01',
    title: 'Brief invullen',
    description: '6 vragen, 10 minuten. Wij halen de winnende hoeken uit je product en reviews.',
  },
  {
    number: '02',
    title: "Video's worden gemaakt",
    description: 'AI-gegenereerde UGC met vaste personas. 9:16, authentiek, TikTok-native. Klaar in 7 werkdagen.',
  },
  {
    number: '03',
    title: 'Jij post & converteert',
    description: "Je krijgt de video's kant-en-klaar. Zelf uploaden of wij doen het. AIGC-label inbegrepen.",
  },
]

const packages = [
  {
    name: 'Starter',
    price: '€1.000',
    period: '/maand',
    videos: "15 video's",
    highlight: false,
    cta: 'Start nu',
  },
  {
    name: 'Growth',
    price: '€1.750',
    period: '/maand',
    videos: "20 video's + 10 productvideo's",
    highlight: true,
    badge: 'Meest gekozen',
    cta: 'Start nu',
  },
  {
    name: 'Full Retainer',
    price: '€3.000+',
    period: '/maand',
    videos: "40 video's + strategie",
    highlight: false,
    cta: 'Neem contact op',
  },
]

const faqs = [
  {
    q: 'Is het echt AI-gegenereerd?',
    a: 'Ja. Wij werken met AI-personas en AI-videogeneratie. Alle video\'s worden gelabeld als AI-gegenereerd (TikTok AIGC-toggle), volledig conform EU AI Act Art. 50.',
  },
  {
    q: 'Hoe snel zijn de eerste video\'s klaar?',
    a: 'Eerste batch is binnen 7 werkdagen na onboarding gereed. Bij de Launch Sprint werken we op 30-dagen-deadline.',
  },
  {
    q: 'Mag ik de video\'s zelf uploaden op TikTok?',
    a: "Ja. Jij krijgt de bestanden en een uploadgids. Wil je dat wij het regelen? Dat kan in het Full Retainer pakket.",
  },
  {
    q: 'Wat als ik niet tevreden ben?',
    a: 'Eén revisieronde is in elk pakket inbegrepen. We sturen nooit content door waar jij niet achter staat.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-neutral-300">TikTok Shop NL — live 15 juni 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            AI UGC die verkoopt.
            <br />
            <span className="text-accent">Geen acteurs.</span>
            <br />
            Geen gedoe.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 max-w-xl mb-10 leading-relaxed">
            Wij maken TikTok-native video&apos;s voor e-commercemerken — schaalbaar, compliant,
            en klaar voor TikTok Shop NL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/werk" className="btn-primary">
              Bekijk ons werk
            </Link>
            <Link href="/contact" className="btn-secondary">
              Gratis intake aanvragen
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="section-label mb-3">Hoe het werkt</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Van brief naar converterende video&apos;s.
            <br />
            <span className="text-neutral-500">In 7 werkdagen.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="card group hover:border-accent/40 transition-colors duration-300">
              <div className="text-5xl font-black text-accent/20 mb-4 group-hover:text-accent/40 transition-colors duration-300">
                {step.number}
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Package preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-border">
        <div className="mb-14">
          <p className="section-label mb-3">Pakketten</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Kies je schaal.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`card relative flex flex-col ${
                pkg.highlight
                  ? 'border-accent shadow-[0_0_40px_rgba(0,255,136,0.08)]'
                  : ''
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-accent text-background text-xs font-bold px-3 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                </div>
              )}
              <div className="mb-4">
                <p className="text-sm text-neutral-400 mb-1">{pkg.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">{pkg.price}</span>
                  <span className="text-neutral-500 text-sm">{pkg.period}</span>
                </div>
              </div>
              <p className="text-sm text-neutral-300 mb-6 flex-1">{pkg.videos}</p>
              <Link
                href="/pakketten"
                className={pkg.highlight ? 'btn-primary text-sm py-2.5' : 'btn-secondary text-sm py-2.5'}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pakketten" className="text-accent text-sm font-medium hover:underline">
            Alle pakketten & features vergelijken →
          </Link>
        </div>
      </section>

      {/* Audit CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-surface border border-border rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="section-label mb-2">Nog niet zeker?</p>
            <h3 className="text-2xl font-black mb-2">Betaalde audit voor €297</h3>
            <p className="text-neutral-400 text-sm max-w-md">
              30 minuten strategie-sessie + 3 hook-concepten op maat + adviesrapport.
              Bedrag wordt verrekend als je daarna een pakket afneemt.
            </p>
          </div>
          <Link href="/audit" className="btn-primary shrink-0">
            Boek audit →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-border">
        <div className="mb-12">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="text-3xl font-black tracking-tight">Veelgestelde vragen</h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-border pb-6">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center border-t border-border">
        <p className="section-label mb-4">Klaar om te starten?</p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
          Het 2%-venster sluit.
          <br />
          <span className="text-accent">Maximaliseer je eerste kwartaal.</span>
        </h2>
        <p className="text-neutral-400 mb-10 max-w-md mx-auto">
          TikTok Shop NL hanteert 2% commissie de eerste 90 dagen. Daarna 9%.
          Meer volume nu = meer marge nu.
        </p>
        <Link href="/contact" className="btn-primary text-lg px-8 py-4">
          Start gratis intake
        </Link>
      </section>
    </>
  )
}
