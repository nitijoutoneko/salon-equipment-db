import BedVisual from '../components/BedVisual';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { products } from '../data/products';

export default function Home() {
  return (
    <><SiteHeader /><main>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SALON EQUIPMENT GUIDE</p>
          <h1>施術ベッド選びを、<br />もっと確かに。</h1>
          <p className="lead">サロン・整体・エステ向けの施術ベッドを、用途や機能から比較できる専門ガイドです。</p>
          <div className="hero-actions">
            <Link className="button primary" href="/products">条件から探す</Link>
            <a className="button secondary" href="#guide">選び方を見る</a>
          </div>
          <p className="demo-note">掲載内容はデモデータです。実在商品の情報ではありません。</p>
        </div>
        <div className="hero-visual" aria-label="施術ベッドのイメージ">
          <div className="sun" />
          <div className="bed-art"><div className="bed-mattress" /><div className="bed-leg left" /><div className="bed-leg right" /></div>
          <div className="visual-tag"><strong>比較しやすい</strong><span>サイズ・機能・用途をひと目で</span></div>
        </div>
      </section>

      <section className="trust-row" aria-label="サイトの特徴">
        <span>✓ 用途別に絞り込み</span><span>✓ 最大3商品を比較</span><span>✓ スマホでも見やすい</span>
      </section>

      <section className="section" id="products">
        <div className="section-heading">
          <div><p className="eyebrow">PICK UP</p><h2>気になるタイプから探す</h2></div>
          <Link href="/products">すべての商品を見る →</Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 3).map((bed) => (
            <article className="product-card" key={bed.name}>
              <Link href={`/products/${bed.slug}`}><BedVisual tone={bed.tone} compact /></Link>
              <div className="card-body"><span className="pill">{bed.type}</span><Link href={`/products/${bed.slug}`}><h3>{bed.name}</h3></Link><p>{bed.uses.slice(0, 2).join('・')}　/　幅 {bed.width}cm</p><Link className="card-text-link" href={`/products/${bed.slug}`}>詳しく見る →</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-strip" id="guide">
        <p className="eyebrow">HOW TO CHOOSE</p>
        <h2>最初に見るべき、3つのポイント</h2>
        <div className="guide-grid"><div><b>01</b><h3>施術内容</h3><p>整体、フェイシャルなど、主な用途から必要な形を考えます。</p></div><div><b>02</b><h3>設置スペース</h3><p>動線を含めて、無理なく置ける幅と長さを確認します。</p></div><div><b>03</b><h3>高さ調整</h3><p>施術者の負担を減らす調整方式と可動域を比べます。</p></div></div>
      </section>
    </main><SiteFooter /></>
  );
}
