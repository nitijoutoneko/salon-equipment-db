import type { MetadataRoute } from 'next';
import { products } from '../data/products';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/compare`, changeFrequency: 'monthly', priority: 0.6 },
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
