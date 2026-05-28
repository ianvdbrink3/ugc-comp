import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden — AI UGC Studio',
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <p className="section-label mb-4">Juridisch</p>
      <h1 className="text-4xl font-black tracking-tight mb-10">Algemene Voorwaarden</h1>

      <div className="space-y-8 text-neutral-300 text-sm leading-relaxed">
        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 1 — Definities</h2>
          <p>
            &quot;AI UGC Studio&quot;: de eenmanszaak die diensten levert op het gebied van AI-gegenereerde
            UGC-content voor e-commercemerken. &quot;Opdrachtgever&quot;: de onderneming die een overeenkomst
            aangaat met AI UGC Studio. &quot;Content&quot;: alle geleverde video&apos;s, afbeeldingen en teksten.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 2 — Toepasselijkheid</h2>
          <p>
            Deze voorwaarden zijn van toepassing op alle aanbiedingen, opdrachten en overeenkomsten
            tussen AI UGC Studio en de Opdrachtgever. Afwijkingen zijn alleen geldig indien schriftelijk
            overeengekomen.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 3 — Aanbod & Overeenkomst</h2>
          <p>
            Alle aanbiedingen zijn vrijblijvend tenzij een acceptatietermijn is vermeld. Een overeenkomst
            komt tot stand na schriftelijke bevestiging (e-mail volstaat) door AI UGC Studio.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 4 — Levering</h2>
          <p>
            Levering van de eerste batch vindt plaats binnen 7 werkdagen na ontvangst van de ingevulde
            brief en goedkeuring van de concepten. Bij de Launch Sprint geldt de overeengekomen 30-dagentermijn.
            Alle levertijden zijn indicatief.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 5 — Eigendom & Licentie</h2>
          <p>
            Na volledige betaling draagt AI UGC Studio alle eigendomsrechten op de geleverde Content over
            aan de Opdrachtgever. De Opdrachtgever mag de Content onbeperkt gebruiken op alle platforms.
            AI UGC Studio behoudt het recht om anonieme of gelabelde voorbeelden te tonen in het eigen portfolio,
            tenzij schriftelijk anders overeengekomen.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 6 — Betaling</h2>
          <p>
            Betaling dient te geschieden binnen 14 dagen na factuurdatum. Bij maandelijkse pakketten
            wordt vooraf per maand gefactureerd. Bij niet-tijdige betaling is AI UGC Studio gerechtigd
            de levering op te schorten.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 7 — Opzegging</h2>
          <p>
            Maandelijkse pakketten zijn opzegbaar per e-mail met inachtneming van een opzegtermijn van
            één kalendermaand. De betaalde audit (€297) is niet restitueerbaar na aanvang van de werkzaamheden.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 8 — Aansprakelijkheid</h2>
          <p>
            AI UGC Studio is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.
            De aansprakelijkheid is in alle gevallen beperkt tot het bedrag dat de Opdrachtgever in de
            betreffende maand heeft betaald.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 9 — Klachten</h2>
          <p>
            Klachten dienen binnen 7 werkdagen na levering schriftelijk te worden gemeld via
            {' '}<a href="mailto:iandepian@gmail.com" className="text-accent hover:underline">iandepian@gmail.com</a>.
            AI UGC Studio streeft ernaar klachten binnen 5 werkdagen te behandelen.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-3">Artikel 10 — Toepasselijk recht</h2>
          <p>
            Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan
            de bevoegde rechter in Nederland.
          </p>
        </div>

        <p className="text-neutral-600 text-xs border-t border-border pt-6">
          Laatste update: mei 2026 — AI UGC Studio, Nederland
        </p>
      </div>
    </section>
  )
}
