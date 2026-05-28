'use client'

import { useState } from 'react'

type Niche = 'alle' | 'beauty' | 'gadget' | 'fashion'

interface VideoItem {
  id: number
  niche: Exclude<Niche, 'alle'>
  hook: string
  concept: string
  duration: string
}

const videos: VideoItem[] = [
  {
    id: 1,
    niche: 'beauty',
    hook: '"Ik was 27 jaar oud toen ik eindelijk begreep wat mijn huid nodig had"',
    concept: 'Morning routine reveal — voor/na vergelijking',
    duration: '28 sec',
  },
  {
    id: 2,
    niche: 'beauty',
    hook: '"Stop scrollend als je ooit €80+ hebt uitgegeven aan skincare"',
    concept: 'Productdemo — ingrediënten vergelijking',
    duration: '22 sec',
  },
  {
    id: 3,
    niche: 'gadget',
    hook: '"POV: je koopt nooit meer een dure versie van dit product"',
    concept: 'Unboxing + use case demo — kantoor setting',
    duration: '30 sec',
  },
  {
    id: 4,
    niche: 'gadget',
    hook: '"Dit product van €29 verving mijn routine van €200"',
    concept: 'Side-by-side vergelijking — oud vs. nieuw',
    duration: '19 sec',
  },
  {
    id: 5,
    niche: 'fashion',
    hook: '"Hoe mijn outfit-keuzes veranderden na 1 week met dit stuk"',
    concept: 'Outfit transition — casual naar werk',
    duration: '15 sec',
  },
  {
    id: 6,
    niche: 'fashion',
    hook: '"3 outfits, 1 stuk. Dit is waarom iedereen het wil"',
    concept: 'Styling-opties — productversatiliteit',
    duration: '25 sec',
  },
]

const nicheConfig: Record<Exclude<Niche, 'alle'>, { label: string; color: string; bg: string }> = {
  beauty: { label: 'Beauty', color: 'text-pink-400', bg: 'bg-pink-400/10 border-pink-400/30' },
  gadget: { label: 'Gadget', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' },
  fashion: { label: 'Fashion', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/30' },
}

const filters: { value: Niche; label: string }[] = [
  { value: 'alle', label: 'Alle' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'gadget', label: 'Gadget' },
  { value: 'fashion', label: 'Fashion' },
]

const PlayIcon = () => (
  <svg className="w-10 h-10 text-white/80" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
)

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
          Alle video&apos;s hieronder zijn spec-concepten — gemaakt om de kracht van AI UGC te demonstreren.
          Gelabeld als &ldquo;Concept&rdquo; conform onze merkrechten-policy.
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
            </button>
          ))}
        </div>
      </section>

      {/* Video grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => {
            const config = nicheConfig[video.niche]
            return (
              <div key={video.id} className="card group p-0 overflow-hidden hover:border-neutral-600 transition-colors duration-300">
                {/* Video placeholder 9:16 */}
                <div className="relative bg-surface-2 flex items-center justify-center" style={{ aspectRatio: '9/16' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-background" />

                  {/* Fake iPhone-style camera grain */}
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px' }}
                  />

                  {/* Play button */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200">
                    <PlayIcon />
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded px-2 py-0.5">
                    <span className="text-white text-xs font-medium">{video.duration}</span>
                  </div>

                  {/* Concept label */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded px-2 py-0.5">
                    <span className="text-neutral-300 text-xs font-medium">Concept</span>
                  </div>

                  {/* Niche badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-sm font-semibold text-white mb-2 leading-snug line-clamp-2">
                    {video.hook}
                  </p>
                  <p className="text-neutral-500 text-xs leading-relaxed">{video.concept}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty state (shouldn't happen with current data) */}
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
          <div className="flex gap-3">
            <a href="/contact" className="btn-primary shrink-0">Gratis intake</a>
            <a href="/audit" className="btn-secondary shrink-0">Betaalde audit</a>
          </div>
        </div>
      </section>
    </>
  )
}
