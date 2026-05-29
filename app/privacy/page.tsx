import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacybeleid — AI UGC Studio',
}

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <p className="section-label mb-4">Juridisch</p>
      <h1 className="text-4xl font-black tracking-tight mb-10">Privacybeleid</h1>

      <div className="prose-sm space-y-8 text-neutral-300 leading-relaxed">
        <div>
          <h2 className="text-neutral-900 font-bold text-lg mb-3">Wie zijn wij</h2>
          <p>
            AI UGC Studio is een eenmanszaak geregistreerd bij de Kamer van Koophandel in Nederland.
            Contactadres: <a href="mailto:iandepian@gmail.com" className="text-accent hover:underline">iandepian@gmail.com</a>
          </p>
        </div>

        <div>
          <h2 className="text-neutral-900 font-bold text-lg mb-3">Welke gegevens verzamelen wij</h2>
          <p>
            Via het contactformulier op deze website verzamelen wij: merknaam, website-URL, e-mailadres,
            en de informatie die u invult over uw product en doelgroep. Deze gegevens worden uitsluitend
            gebruikt om uw aanvraag te verwerken en contact met u op te nemen.
          </p>
        </div>

        <div>
          <h2 className="text-neutral-900 font-bold text-lg mb-3">Bewaartermijn</h2>
          <p>
            Wij bewaren uw gegevens maximaal 12 maanden na het laatste contact, tenzij een wettelijke
            bewaarplicht anders vereist.
          </p>
        </div>

        <div>
          <h2 className="text-neutral-900 font-bold text-lg mb-3">Uw rechten</h2>
          <p>
            U heeft het recht op inzage, correctie, verwijdering en overdracht van uw persoonsgegevens.
            Stuur hiervoor een e-mail naar{' '}
            <a href="mailto:iandepian@gmail.com" className="text-accent hover:underline">iandepian@gmail.com</a>.
            Wij reageren binnen 30 dagen.
          </p>
        </div>

        <div>
          <h2 className="text-neutral-900 font-bold text-lg mb-3">Cookies</h2>
          <p>
            Deze website gebruikt geen tracking-cookies of analytische cookies van derden.
          </p>
        </div>

        <div>
          <h2 className="text-neutral-900 font-bold text-lg mb-3">Klachten</h2>
          <p>
            Heeft u een klacht over de verwerking van uw persoonsgegevens? U kunt een klacht indienen
            bij de Autoriteit Persoonsgegevens via{' '}
            <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              autoriteitpersoonsgegevens.nl
            </a>.
          </p>
        </div>

        <p className="text-neutral-600 text-xs border-t border-border pt-6">
          Laatste update: mei 2026
        </p>
      </div>
    </section>
  )
}
