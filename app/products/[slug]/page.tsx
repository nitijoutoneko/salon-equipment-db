import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BedVisual from '../../../components/BedVisual';
import DetailCompareButton from '../../../components/DetailCompareButton';
import SiteFooter from '../../../components/SiteFooter';
import SiteHeader from '../../../components/SiteHeader';
import { formatPrice, getProduct, products } from '../../../data/products';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: '商品が見つかりません' };
  const description = `${product.manufacturer} ${product.name}のデモ商品情報。価格・サイズ・機能・購入先を確認できます。`;
  return { title: product.name, description, openGraph: { title: `${product.name}｜ベッドセレクト`, description, images: [] }, twitter: { card: 'summary', title: `${product.name}｜ベッドセレクト`, description, images: [] } };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const similar = products.filter((item) => item.id !== product.id && item.uses.some((use) => product.uses.includes(use))).slice(0, 3);
  const lower = [...products].filter((item) => item.price < product.price).sort((a, b) => b.price - a.price)[0];
  const upper = [...products].filter((item) => item.price > product.price).sort((a, b) => a.price - b.price)[0];

  return (
    <>
      <SiteHeader />
      <main className="page-main detail-page">
        <div className="breadcrumbs"><Link href="/">トップ</Link><span>›</span><Link href="/products">商品一覧</Link><span>›</span><span>{product.shortName}</span></div>
        <div className="detail-demo-banner"><strong>デモデータ</strong><span>以下のメーカー名・商品名・価格・仕様・購入先は実在商品の情報ではありません。</span></div>

        <section className="product-overview">
          <BedVisual tone={product.tone} reclining={product.reclining} portable={product.portable} />
          <div className="product-overview-main"><p className="product-maker">{product.manufacturer}</p><h1>{product.name}</h1><p className="product-model">型番：{product.modelNumber}</p><p className="overview-summary">{product.featureSummary}</p><div className="overview-tags">{product.uses.map((use) => <span key={use}>{use}向け</span>)}</div><dl className="overview-specs"><div><dt>昇降方式</dt><dd>{product.liftType}</dd></div><div><dt>幅 × 長さ</dt><dd>{product.width} × {product.length}cm</dd></div><div><dt>高さ</dt><dd>{product.minHeight}〜{product.maxHeight}cm</dd></div><div><dt>耐荷重</dt><dd>{product.loadCapacity}kg</dd></div></dl><DetailCompareButton productId={product.id} /></div>
          <aside className="price-box"><span>参考価格<small>（デモ）</small></span><strong>{formatPrice(product.price)}</strong><p>価格はUI確認用の架空値です</p><a className="primary-action" href="#purchase">購入先を見る</a><ul><li>購入先URL：未登録</li><li>価格更新日：未登録</li><li>送料・在庫：未登録</li></ul></aside>
        </section>

        <div className="detail-layout">
          <div className="detail-main-column">
            <section className="data-section"><div className="data-section-title"><span>01</span><h2>主な特徴</h2></div><ul className="feature-list">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>

            <section className="data-section"><div className="data-section-title"><span>02</span><h2>スペック表</h2></div><table className="detail-spec-table"><tbody><tr><th>メーカー</th><td>{product.manufacturer}</td><th>型番</th><td>{product.modelNumber}</td></tr><tr><th>参考価格</th><td>{formatPrice(product.price)}（デモ）</td><th>昇降方式</th><td>{product.liftType}</td></tr><tr><th>幅</th><td>{product.width}cm</td><th>長さ</th><td>{product.length}cm</td></tr><tr><th>最低高さ</th><td>{product.minHeight}cm</td><th>最高高さ</th><td>{product.maxHeight}cm</td></tr><tr><th>本体重量</th><td>{product.weight}kg</td><th>耐荷重</th><td>{product.loadCapacity}kg</td></tr><tr><th>電動昇降</th><td>{product.electricLift ? 'あり' : 'なし'}</td><th>リクライニング</th><td>{product.reclining ? 'あり' : 'なし'}</td></tr><tr><th>クッション厚</th><td>{product.cushionThickness}cm</td><th>張地</th><td>{product.upholstery}</td></tr><tr><th>折りたたみ</th><td>{product.portable ? '対応想定' : '非対応想定'}</td><th>フェイスホール</th><td>{product.faceHole ? 'あり' : 'なし'}</td></tr></tbody></table></section>

            <section className="data-section"><div className="data-section-title"><span>03</span><h2>向いている施術</h2></div><div className="treatment-fit">{['整体','リラクゼーション','エステ','フェイシャル','訪問施術'].map((use) => <div key={use}><span>{product.uses.includes(use as never) ? '●' : '―'}</span><strong>{use}</strong><small>{product.uses.includes(use as never) ? '比較候補' : '対象外'}</small></div>)}</div></section>

            <section className="data-section two-column-notes"><div><div className="data-section-title"><span>04</span><h2>メリット</h2></div><ul className="benefit-list">{product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></div><div><div className="data-section-title"><span>05</span><h2>注意点</h2></div><ul className="caution-list">{product.cautions.map((caution) => <li key={caution}>{caution}</li>)}</ul></div></section>

            <section className="data-section" id="purchase"><div className="data-section-title"><span>06</span><h2>購入先</h2></div><p className="section-note">購入URLは商品データ側から後で登録できます。現在はすべて未登録です。</p><div className="store-list">{product.purchaseLinks.map((store) => store.url ? <a href={store.url} key={store.provider} rel="sponsored nofollow"><span>{store.provider}</span><strong>{store.price ? formatPrice(store.price) : '価格未登録'}</strong><b>{store.label} →</b></a> : <div className="store-disabled" key={store.provider}><span>{store.provider}</span><strong>価格未登録</strong><b>URL未登録</b></div>)}</div><p className="affiliate-note">広告・アフィリエイトリンクを掲載する場合は、PR表記と掲載方針を明示します。</p></section>

            <section className="data-section"><div className="data-section-title"><span>07</span><h2>類似商品</h2></div><div className="related-products">{similar.map((item) => <Link href={`/products/${item.slug}`} key={item.id}><BedVisual tone={item.tone} compact reclining={item.reclining} portable={item.portable} /><span>{item.manufacturer}</span><strong>{item.name}</strong><b>{formatPrice(item.price)} <small>（デモ）</small></b></Link>)}</div></section>

            {(lower || upper) && <section className="data-section"><div className="data-section-title"><span>08</span><h2>上位・下位の比較候補</h2></div><div className="alternative-products">{lower && <Link href={`/products/${lower.slug}`}><span>価格を抑える候補</span><strong>{lower.name}</strong><b>{formatPrice(lower.price)}</b></Link>}{upper && <Link href={`/products/${upper.slug}`}><span>上位価格帯の候補</span><strong>{upper.name}</strong><b>{formatPrice(upper.price)}</b></Link>}</div></section>}
          </div>

          <aside className="detail-side-column"><div className="side-compare"><h2>この商品を比較</h2><p>ほかの商品を追加すると、スペックを横並びで確認できます。</p><DetailCompareButton productId={product.id} /><Link href="/products">比較する商品を探す</Link></div><div className="ad-slot vertical"><span>AD</span><div><strong>広告掲載予定枠</strong><p>メーカー直接広告などを想定しています。</p></div></div></aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
