'use client'

import { useState } from 'react'

type FormType = 'intake' | 'audit'

export default function ContactPage() {
  const [formType, setFormType] = useState<FormType>('intake')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate async submit — wire up to Formspree/Resend/etc. later
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black mb-4">Ontvangen!</h1>
        <p className="text-neutral-400 mb-2">
          We nemen binnen <span className="text-white font-semibold">24 uur</span> contact op.
        </p>
        <p className="text-neutral-600 text-sm">
          Check ook je spam-folder voor de bevestiging.
        </p>
      </section>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <p className="section-label mb-4">Contact</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Laten we beginnen.
        </h1>
        <p className="text-neutral-400 max-w-md">
          Vul de brief in — we reageren binnen 24 uur met een concreet voorstel of eerste concepten.
        </p>
      </section>

      {/* Form type toggle */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="inline-flex bg-surface border border-border rounded-xl p-1 gap-1">
          <button
            onClick={() => setFormType('intake')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              formType === 'intake'
                ? 'bg-accent text-background'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Gratis intake
          </button>
          <button
            onClick={() => setFormType('audit')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              formType === 'audit'
                ? 'bg-accent text-background'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Betaalde audit (€297)
          </button>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Merknaam */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Merknaam <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="bv. Skin Lab NL"
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors duration-200"
            />
          </div>

          {/* Website + TikTok */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Website <span className="text-accent">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://jouwmerk.nl"
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                TikTok handle
              </label>
              <input
                type="text"
                placeholder="@jouwmerk"
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors duration-200"
              />
            </div>
          </div>

          {/* Niche */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Niche <span className="text-accent">*</span>
            </label>
            <select
              required
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors duration-200 appearance-none"
            >
              <option value="" disabled selected>Selecteer niche</option>
              <option value="beauty">Beauty / Skincare</option>
              <option value="supplementen">Supplementen / Health</option>
              <option value="fashion">Fashion / Kleding</option>
              <option value="home-gadget">Home / Gadget</option>
              <option value="fitness">Fitness / Sport</option>
              <option value="anders">Anders</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Maandelijks advertentiebudget <span className="text-accent">*</span>
            </label>
            <select
              required
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors duration-200 appearance-none"
            >
              <option value="" disabled selected>Selecteer budget</option>
              <option value="onder-500">Onder €500</option>
              <option value="500-1500">€500 – €1.500</option>
              <option value="1500-5000">€1.500 – €5.000</option>
              <option value="5000-plus">€5.000+</option>
            </select>
          </div>

          {/* Product beschrijving */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Beschrijf je product <span className="text-accent">*</span>
            </label>
            <p className="text-neutral-600 text-xs mb-2">
              Leg het uit zoals je het aan een vriend uitlegt. 3-5 zinnen.
            </p>
            <textarea
              required
              rows={4}
              placeholder="Ons product is een serum dat... Het werkt door... Onze klanten kopen het omdat..."
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
            />
          </div>

          {/* Pijn / probleem */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Waar loop je nu tegenaan? <span className="text-accent">*</span>
            </label>
            <p className="text-neutral-600 text-xs mb-2">
              Content die niet converteert? Te weinig volume? Ad fatigue? Geen TikTok aanwezig?
            </p>
            <textarea
              required
              rows={4}
              placeholder="Op dit moment is ons grootste probleem..."
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
            />
          </div>

          {/* Doel (alleen voor intake) */}
          {formType === 'intake' && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Doel komende 30 dagen <span className="text-accent">*</span>
              </label>
              <select
                required
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors duration-200 appearance-none"
              >
                <option value="" disabled selected>Selecteer doel</option>
                <option value="meer-verkopen">Meer verkopen via TikTok</option>
                <option value="tiktok-shop-launch">TikTok Shop NL lanceren</option>
                <option value="meer-volgers">Meer TikTok volgers</option>
                <option value="meta-ads">Betere Meta-ad performance</option>
                <option value="anders">Anders</option>
              </select>
            </div>
          )}

          {/* E-mail */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Jouw e-mailadres <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="jij@jouwmerk.nl"
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors duration-200"
            />
          </div>

          {/* Compliance note */}
          <p className="text-neutral-600 text-xs leading-relaxed">
            Wij werken alleen met onderbouwde claims. Geen nep-reviews, geen fake resultaten —
            conform EU AI Act en ACM-richtlijnen.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Versturen…' : formType === 'audit' ? 'Boek audit voor €297' : 'Verstuur intake'}
          </button>
        </form>
      </section>
    </>
  )
}
