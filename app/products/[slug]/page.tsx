import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BedVisual from '../../../components/BedVisual';
import DetailCompareButton from '../../../components/DetailCompareButton';
import SiteFooter from '../../../components/SiteFooter';
import SiteHeader from '../../../components/SiteHeader';
import { getProduct, products } from '../../../data/products';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: '商品が見つかりません' };
  const description = `${product.name}のデモ詳細ページ。${product.tagline}。仕様値はUI確認用です。`;
  return {
    title: product.name,
    description,
    openGraph: { title: `${product.name}｜ベッドセレクト`, description, images: [] },
    twitter: { card: 'summary', title: `${product.name}｜ベッドセレクト`, description, images: [] },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <><SiteHeader /><main className="page-main detail-page"><div className="breadcrumbs"><Link href="/">ホーム</Link><span>›</span><Link href="/products">商品一覧</Link><span>›</span><span>{product.shortName}</span></div>
      <section className="detail-hero"><BedVisual tone={product.tone} /><div className="detail-summary"><div className="tag-row"><span className="pill">{product.type}</span>{product.uses.map((item) => <span className="plain-tag" key={item}>{item}</span>)}</div><h1>{product.name}</h1><p className="detail-tagline">{product.tagline}</p><p className="detail-description">{product.description}</p><div className="data-warning"><strong>デモデータ</strong><span>以下の仕様は実在商品に基づくものではありません。</span></div><DetailCompareButton productId={product.id} /></div></section>

      <section className="detail-content"><div className="spec-panel"><p className="eyebrow">SPECIFICATIONS</p><h2>基本仕様（サンプル）</h2><dl className="spec-list"><div><dt>タイプ</dt><dd>{product.type}</dd></div><div><dt>幅 × 長さ</dt><dd>{product.width} × {product.length}cm</dd></div><div><dt>高さ範囲</dt><dd>{product.minHeight}〜{product.maxHeight}cm</dd></div><div><dt>フェイスホール</dt><dd>{product.faceHole ? 'あり' : 'なし'}</dd></div><div><dt>リクライニング</dt><dd>{product.reclining ? 'あり' : 'なし'}</dd></div><div><dt>持ち運び</dt><dd>{product.portable ? '対応想定' : '非対応想定'}</dd></div><div><dt>クッション</dt><dd>{product.cushion}</dd></div><div><dt>張地</dt><dd>{product.upholstery}</dd></div></dl></div><aside className="feature-panel"><p className="eyebrow">FEATURES</p><h2>特徴</h2><ol>{product.features.map((feature, index) => <li key={feature}><span>0{index + 1}</span><strong>{feature}</strong></li>)}</ol><Link className="button secondary full-button" href="/products">一覧に戻って探す</Link></aside></section>
    </main><SiteFooter /></>
  );
}
