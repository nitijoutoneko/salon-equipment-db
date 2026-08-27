import type { MetadataRoute } from 'next';
import { products } from '../data/products';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/compare`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/conditions`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/advertising`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
