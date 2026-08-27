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
const title = 'ベッドセレクト｜施術ベッド検索・価格比較データベース';
const description = 'サロン・整体・エステ向け施術ベッドを、価格・用途・サイズ・機能から検索し、2〜3商品を横並びで比較できる商品データベースです。';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: '%s｜ベッドセレクト' },
  description,
  applicationName: 'ベッドセレクト',
  alternates: siteUrl ? { canonical: '/' } : undefined,
  openGraph: {
    type: 'website', locale: 'ja_JP', title, description, siteName: 'ベッドセレクト',
    url: siteUrl ? '/' : undefined,
    images: siteUrl ? [{ url: '/og.png', width: 1200, height: 630, alt: 'ベッドセレクト｜施術ベッドを、検索・比較。' }] : [],
  },
  twitter: {
    card: 'summary_large_image', title, description,
    images: siteUrl ? ['/og.png'] : [],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
