import type { Metadata } from 'next';
import './globals.css';

function configuredSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : undefined;
  } catch {
    return undefined;
  }
}

const siteUrl = configuredSiteUrl();
const title = 'ベッドセレクト｜施術ベッド比較ガイド';
const description = 'サロン・整体・エステ向け施術ベッドを、用途・サイズ・機能から探して比較できる専門ガイドです。';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: '%s｜ベッドセレクト' },
  description,
  applicationName: 'ベッドセレクト',
  alternates: siteUrl ? { canonical: '/' } : undefined,
  openGraph: {
    type: 'website', locale: 'ja_JP', title, description, siteName: 'ベッドセレクト',
    url: siteUrl ? '/' : undefined,
    images: siteUrl ? [{ url: '/og.png', width: 1200, height: 630, alt: 'ベッドセレクト｜施術ベッド選びを、もっと確かに。' }] : [],
  },
  twitter: {
    card: 'summary_large_image', title, description,
    images: siteUrl ? ['/og.png'] : [],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
