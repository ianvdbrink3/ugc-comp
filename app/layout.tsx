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
  title: "AI UGC Studio — TikTok-native video's voor e-commercemerken",
  description:
    "Wij maken AI-gegenereerde UGC video's voor Nederlandse TikTok Shop merken. Schaalbaar, EU AI Act compliant, klaar voor TikTok Shop NL. Vanaf €1.000/maand.",
  keywords: ['AI UGC', 'TikTok Shop', 'UGC studio', 'TikTok content', 'e-commerce video', 'Nederland'],
  openGraph: {
    title: "AI UGC Studio — TikTok-native video's voor e-commercemerken",
    description: 'Schaalbare AI UGC voor TikTok Shop NL. Geen acteurs. Geen gedoe.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="bg-background text-white font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
