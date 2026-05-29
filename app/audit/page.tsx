import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Betaalde Audit — AI UGC Studio',
  description: 'Weet in 30 minuten wat jouw TikTok-content mist. €297 eenmalig. Verrekend bij pakket.',
}

const CheckIcon = () => (
  <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export default function AuditPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 text-xs font-semibold text-accent mb-8 tracking-wide">
            €297 eenmalig · verrekend bij pakket
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            Weet in 30 minuten wat{' '}
            <span className="text-accent">jouw TikTok-content</span>{' '}
            mist
          </h1>
          <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Geen algemeen advies. Geen freelancer die je een whitepaper stuurt.
            Een concrete analyse van jouw merk, jouw product, jouw kansen op TikTok Shop NL.
          </p>
          <Link href="/contact?type=audit" className="btn-primary text-lg px-10 py-4">
            Boek nu voor €297
          </Link>
          <p className="text-muted text-sm mt-4">
            Directe bevestiging · Call binnen 48 uur gepland
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Wat je krijgt</span>
            <h2 className="text-3xl font-black mt-3">Drie concrete deliverables</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: '30-min strategie-call',
                desc: 'We gaan samen door jouw product, doelgroep en huidige content. Geen pitch, gewoon waardevolle inzichten.',
                icon: '📞',
              },
              {
                number: '02',
                title: '3 hook-concepten op maat',
                desc: 'We schrijven 3 bewezen hook-formules toegespitst op jouw product en doelgroep. Klaar om te testen.',
                icon: '🪝',
              },
              {
                number: '03',
                title: 'Schriftelijk adviesrapport',
                desc: 'PDF-rapport met: content-gaps, kansen voor TikTok Shop NL, en een concreet actieplan voor de komende 30 dagen.',
                icon: '📄',
              },
            ].map((item) => (
              <div key={item.number} className="card">
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="text-4xl font-black text-accent/20 mb-3 leading-none">{item.number}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Stappenplan</span>
            <h2 className="text-3xl font-black mt-3">Hoe werkt het?</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Betaal online',
                desc: 'Directe bevestiging per e-mail. Je ontvangt de brief-link en een Calendly om de call te plannen.',
              },
              {
                step: '2',
                title: 'Vul de brief in',
                desc: '6 vragen over je product, doelgroep, huidige content en doel. Duurt 10 minuten.',
              },
              {
                step: '3',
                title: 'Ontvang rapport + call',
                desc: 'Binnen 48 uur ontvang je het adviesrapport. Tijdens de call lopen we het samen door en beantwoorden we al je vragen.',
              },
            ].map((s) => (
              <div key={s.step} className="card flex gap-5">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent font-black text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface border border-border rounded-2xl p-8 sm:p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-2 border border-border mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <blockquote className="text-lg sm:text-xl font-medium text-neutral-300 leading-relaxed mb-6 italic">
              &ldquo;Na de audit wisten we precies welke hooks we moesten testen. Binnen twee weken hadden we onze eerste TikTok-video met 80K views. De audit betaalde zichzelf in de eerste week terug.&rdquo;
            </blockquote>
            <div className="text-muted text-sm">
              <span className="font-semibold text-white">Sophie de Vries</span>
              {' · '}
              <span>Oprichtster, Skin Lab NL</span>
              {' · '}
              <span className="text-accent/70 italic">(conceptklant)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Klaar om te weten waar je staat?
          </h2>
          <p className="text-neutral-400 mb-3 leading-relaxed">
            De audit kost €297. Dat bedrag wordt volledig verrekend als je daarna een pakket afneemt.
            Je riskeert dus nooit meer dan de tijd die je erin steekt.
          </p>
          <p className="text-muted text-sm mb-10">
            TikTok Shop NL lanceert 15 juni 2026. Er zijn nu nog auditplekken beschikbaar.
          </p>
          <Link href="/contact?type=audit" className="btn-primary text-lg px-10 py-4">
            Boek audit voor €297
          </Link>
          <p className="text-muted text-xs mt-4">
            Of heb je meteen een vraag?{' '}
            <a href="mailto:hallo@aiugcstudio.nl" className="text-accent hover:underline">
              Stuur een e-mail
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
