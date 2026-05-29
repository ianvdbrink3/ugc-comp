'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm, ValidationError } from '@formspree/react'

type FormType = 'intake' | 'audit'

const inputClass =
  'w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors duration-200'

const errorClass = 'text-red-400 text-xs mt-1'

function ContactForm() {
  const searchParams = useSearchParams()
  const [formType, setFormType] = useState<FormType>('intake')
  const [state, handleSubmit] = useForm('xkoeeoyw')

  useEffect(() => {
    if (searchParams.get('type') === 'audit') setFormType('audit')
  }, [searchParams])

  if (state.succeeded) {
    return (
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black mb-4">Ontvangen!</h1>
        <p className="text-neutral-400 mb-2">
          We nemen binnen <span className="text-neutral-900 font-semibold">24 uur</span> contact op.
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
            type="button"
            onClick={() => setFormType('intake')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              formType === 'intake' ? 'bg-accent text-background' : 'text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Gratis intake
          </button>
          <button
            type="button"
            onClick={() => setFormType('audit')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              formType === 'audit' ? 'bg-accent text-background' : 'text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Betaalde audit (€297)
          </button>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hidden: form type */}
          <input type="hidden" name="formType" value={formType} />

          {/* Merknaam */}
          <div>
            <label htmlFor="merknaam" className="block text-sm font-semibold mb-2">
              Merknaam <span className="text-accent">*</span>
            </label>
            <input
              id="merknaam"
              type="text"
              name="merknaam"
              required
              placeholder="bv. Skin Lab NL"
              className={inputClass}
            />
            <ValidationError field="merknaam" prefix="Merknaam" errors={state.errors} className={errorClass} />
          </div>

          {/* Website + TikTok */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="website" className="block text-sm font-semibold mb-2">
                Website <span className="text-accent">*</span>
              </label>
              <input
                id="website"
                type="url"
                name="website"
                required
                placeholder="https://jouwmerk.nl"
                className={inputClass}
              />
              <ValidationError field="website" prefix="Website" errors={state.errors} className={errorClass} />
            </div>
            <div>
              <label htmlFor="tiktok" className="block text-sm font-semibold mb-2">
                TikTok handle
              </label>
              <input
                id="tiktok"
                type="text"
                name="tiktok"
                placeholder="@jouwmerk"
                className={inputClass}
              />
            </div>
          </div>

          {/* Niche */}
          <div>
            <label htmlFor="niche" className="block text-sm font-semibold mb-2">
              Niche <span className="text-accent">*</span>
            </label>
            <select
              id="niche"
              name="niche"
              required
              defaultValue=""
              className={`${inputClass} appearance-none`}
            >
              <option value="" disabled>Selecteer niche</option>
              <option value="beauty">Beauty / Skincare</option>
              <option value="supplementen">Supplementen / Health</option>
              <option value="fashion">Fashion / Kleding</option>
              <option value="home-gadget">Home / Gadget</option>
              <option value="fitness">Fitness / Sport</option>
              <option value="anders">Anders</option>
            </select>
            <ValidationError field="niche" prefix="Niche" errors={state.errors} className={errorClass} />
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-semibold mb-2">
              Maandelijks advertentiebudget <span className="text-accent">*</span>
            </label>
            <select
              id="budget"
              name="budget"
              required
              defaultValue=""
              className={`${inputClass} appearance-none`}
            >
              <option value="" disabled>Selecteer budget</option>
              <option value="onder-500">Onder €500</option>
              <option value="500-1500">€500 – €1.500</option>
              <option value="1500-5000">€1.500 – €5.000</option>
              <option value="5000-plus">€5.000+</option>
            </select>
            <ValidationError field="budget" prefix="Budget" errors={state.errors} className={errorClass} />
          </div>

          {/* Product beschrijving */}
          <div>
            <label htmlFor="product" className="block text-sm font-semibold mb-2">
              Beschrijf je product <span className="text-accent">*</span>
            </label>
            <p className="text-neutral-600 text-xs mb-2">
              Leg het uit zoals je het aan een vriend uitlegt. 3-5 zinnen.
            </p>
            <textarea
              id="product"
              name="product"
              required
              rows={4}
              placeholder="Ons product is een serum dat... Het werkt door... Onze klanten kopen het omdat..."
              className={`${inputClass} resize-none`}
            />
            <ValidationError field="product" prefix="Product" errors={state.errors} className={errorClass} />
          </div>

          {/* Pijn / probleem */}
          <div>
            <label htmlFor="pijn" className="block text-sm font-semibold mb-2">
              Waar loop je nu tegenaan? <span className="text-accent">*</span>
            </label>
            <p className="text-neutral-600 text-xs mb-2">
              Content die niet converteert? Te weinig volume? Ad fatigue? Geen TikTok aanwezig?
            </p>
            <textarea
              id="pijn"
              name="pijn"
              required
              rows={4}
              placeholder="Op dit moment is ons grootste probleem..."
              className={`${inputClass} resize-none`}
            />
            <ValidationError field="pijn" prefix="Probleem" errors={state.errors} className={errorClass} />
          </div>

          {/* Doel (alleen voor intake) */}
          {formType === 'intake' && (
            <div>
              <label htmlFor="doel" className="block text-sm font-semibold mb-2">
                Doel komende 30 dagen <span className="text-accent">*</span>
              </label>
              <select
                id="doel"
                name="doel"
                required
                defaultValue=""
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>Selecteer doel</option>
                <option value="meer-verkopen">Meer verkopen via TikTok</option>
                <option value="tiktok-shop-launch">TikTok Shop NL lanceren</option>
                <option value="meer-volgers">Meer TikTok volgers</option>
                <option value="meta-ads">Betere Meta-ad performance</option>
                <option value="anders">Anders</option>
              </select>
              <ValidationError field="doel" prefix="Doel" errors={state.errors} className={errorClass} />
            </div>
          )}

          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Jouw e-mailadres <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="jij@jouwmerk.nl"
              className={inputClass}
            />
            <ValidationError field="email" prefix="E-mail" errors={state.errors} className={errorClass} />
          </div>

          {/* Form-level errors */}
          <ValidationError errors={state.errors} className={errorClass} />

          {/* Compliance note */}
          <p className="text-neutral-600 text-xs leading-relaxed">
            Wij werken alleen met onderbouwde claims. Geen nep-reviews, geen fake resultaten —
            conform EU AI Act en ACM-richtlijnen.
          </p>

          <button
            type="submit"
            disabled={state.submitting}
            className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state.submitting
              ? 'Versturen…'
              : formType === 'audit'
              ? 'Boek audit voor €297'
              : 'Verstuur intake'}
          </button>
        </form>
      </section>
    </>
  )
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  )
}
