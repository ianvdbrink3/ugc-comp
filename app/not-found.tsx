import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
      <p className="text-accent font-black text-6xl mb-6">404</p>
      <h1 className="text-3xl font-black mb-4">Pagina niet gevonden</h1>
      <p className="text-neutral-400 mb-10">
        Deze pagina bestaat niet (meer). Ga terug naar de homepage of bekijk ons werk.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/" className="btn-primary">Naar home</Link>
        <Link href="/werk" className="btn-secondary">Bekijk werk</Link>
      </div>
    </section>
  )
}
