import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: "AI UGC Studio — TikTok-native video's voor e-commercemerken",
    template: '%s — AI UGC Studio',
  },
  description:
    "Wij maken AI-gegenereerde UGC video's voor Nederlandse TikTok Shop merken. Schaalbaar, EU AI Act compliant, klaar voor TikTok Shop NL. Vanaf €1.000/maand.",
  keywords: ['AI UGC', 'TikTok Shop NL', 'UGC studio Nederland', 'TikTok content', 'e-commerce video', 'AI video marketing'],
  metadataBase: new URL('https://aiugcstudio.nl'),
  alternates: { canonical: '/' },
  openGraph: {
    title: "AI UGC Studio — TikTok-native video's voor e-commercemerken",
    description: 'Schaalbare AI UGC voor TikTok Shop NL. Geen acteurs. Geen gedoe.',
    url: 'https://aiugcstudio.nl',
    siteName: 'AI UGC Studio',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI UGC Studio — TikTok-native video's",
    description: 'Schaalbare AI UGC voor TikTok Shop NL. Vanaf €1.000/maand.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="bg-background text-neutral-900 font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
