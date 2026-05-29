'use client'

import { useState } from 'react'
import VideoCard from '@/components/VideoCard'

type Niche = 'alle' | 'beauty' | 'gadget' | 'fashion'

const videos = [
  {
    id: 1,
    niche: 'beauty' as const,
    hookText: 'Ik was 27 jaar oud toen ik eindelijk begreep wat mijn huid nodig had',
    concept: 'Morning routine reveal — voor/na vergelijking',
  },
  {
    id: 2,
    niche: 'beauty' as const,
    hookText: 'Stop scrollend als je ooit €80+ hebt uitgegeven aan skincare die niks deed',
    concept: 'Productdemo — ingrediënten vergelijking',
  },
  {
    id: 3,
    niche: 'gadget' as const,
    hookText: 'POV: je koopt nooit meer een dure versie van dit product',
    concept: 'Unboxing + use case demo — kantoor setting',
  },
  {
    id: 4,
    niche: 'gadget' as const,
    hookText: 'Dit product van €29 verving mijn routine van €200',
    concept: 'Side-by-side vergelijking — oud vs. nieuw',
  },
  {
    id: 5,
    niche: 'fashion' as const,
    hookText: 'Hoe mijn outfit-keuzes veranderden na 1 week met dit ene stuk',
    concept: 'Outfit transition — casual naar werk',
  },
  {
    id: 6,
    niche: 'fashion' as const,
    hookText: '3 outfits, 1 stuk. Dit is waarom iedereen het wil hebben',
    concept: 'Styling-opties — productversatiliteit',
  },
]

const filters: { value: Niche; label: string }[] = [
  { value: 'alle', label: 'Alle' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'gadget', label: 'Gadget' },
  { value: 'fashion', label: 'Fashion' },
]

export default function WerkPage() {
  const [active, setActive] = useState<Niche>('alle')
  const filtered = active === 'alle' ? videos : videos.filter((v) => v.niche === active)

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <p className="section-label mb-4">Ons werk</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Conceptvideo&apos;s.
          <span className="text-neutral-500"> Echt gemaakt.</span>
        </h1>
        <p className="text-neutral-400 max-w-xl leading-relaxed">
          Alle video&apos;s hieronder zijn spec-concepten — gemaakt om de kracht van AI UGC te
          demonstreren. Gelabeld als &ldquo;Concept&rdquo; conform onze merkrechten-policy.
          Echte klantcases volgen zodra pilots live zijn.
        </p>
      </section>

      {/* Filter tabs */}
      <section className="pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                active === f.value
                  ? 'bg-accent text-background border-accent'
                  : 'border-border text-neutral-400 hover:text-white hover:border-neutral-500'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${active === f.value ? 'text-background/70' : 'text-neutral-600'}`}>
                {f.value === 'alle' ? videos.length : videos.filter(v => v.niche === f.value).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Video grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => (
            <VideoCard
              key={video.id}
              niche={video.niche}
              hookText={video.hookText}
              concept={video.concept}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-neutral-600">
            <p className="text-lg font-semibold mb-2">Geen video&apos;s gevonden</p>
            <p className="text-sm">Kies een andere niche-filter</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black mb-2">Wil je video&apos;s voor jouw merk?</h2>
            <p className="text-neutral-400 text-sm">
              We maken 5 gratis video&apos;s voor de sterkste leads. Of start direct met een pakket.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="/contact" className="btn-primary">Gratis intake</a>
            <a href="/audit" className="btn-secondary">Betaalde audit</a>
          </div>
        </div>
      </section>
    </>
  )
}
