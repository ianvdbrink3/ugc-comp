import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
                <span className="text-background font-black text-sm">U</span>
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                AI UGC <span className="text-accent">Studio</span>
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              TikTok-native AI UGC voor Nederlandse e-commercemerken. Schaalbaar, compliant, en klaar voor TikTok Shop NL.
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 bg-surface border border-border rounded-full px-3 py-1 text-xs text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                EU AI Act compliant
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigatie</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/werk', label: 'Werk' },
                { href: '/pakketten', label: 'Pakketten' },
                { href: '/audit', label: 'Audit' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:iandepian@gmail.com"
                  className="text-muted text-sm hover:text-white transition-colors duration-200"
                >
                  iandepian@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-sm hover:text-white transition-colors duration-200"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-sm hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} AI UGC Studio. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-muted text-xs hover:text-white transition-colors duration-200">
              Privacybeleid
            </Link>
            <Link href="/algemene-voorwaarden" className="text-muted text-xs hover:text-white transition-colors duration-200">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
