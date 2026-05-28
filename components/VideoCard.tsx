interface VideoCardProps {
  niche: 'beauty' | 'gadget' | 'fashion'
  hookText: string
  concept: string
}

const nicheConfig = {
  beauty: {
    label: 'Beauty',
    color: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    dot: 'bg-pink-400',
  },
  gadget: {
    label: 'Gadget',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    dot: 'bg-blue-400',
  },
  fashion: {
    label: 'Fashion',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    dot: 'bg-purple-400',
  },
}

export default function VideoCard({ niche, hookText, concept }: VideoCardProps) {
  const config = nicheConfig[niche]

  return (
    <div className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-300">
      {/* Video placeholder — 9:16 aspect ratio */}
      <div className="relative bg-surface-2 w-full" style={{ aspectRatio: '9/16' }}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span
            className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
          </span>
          <span className="bg-background/70 backdrop-blur-sm border border-border rounded-full px-2.5 py-0.5 text-xs text-muted">
            Concept
          </span>
        </div>

        {/* TikTok UI elements */}
        <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span className="text-white text-xs">2.4K</span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="text-white text-sm font-medium leading-snug line-clamp-2">
          &ldquo;{hookText}&rdquo;
        </p>
        <p className="text-muted text-xs mt-2">{concept}</p>
      </div>
    </div>
  )
}
