import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://aiugcstudio.nl'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/pakketten`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/audit`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/werk`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/algemene-voorwaarden`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
