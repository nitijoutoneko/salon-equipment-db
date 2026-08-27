import ProductsExplorer from '../components/ProductsExplorer';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { products } from '../data/products';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="database-home">
        <section className="catalog-heading">
          <div>
            <p className="catalog-kicker">施術ベッド商品データベース</p>
            <h1>施術ベッドを条件から探す</h1>
            <p>用途・サイズ・機能を指定して、候補を比較できます。</p>
          </div>
          <dl className="catalog-counts" aria-label="掲載状況">
            <div><dt>掲載商品</dt><dd>{products.length}<small>件</small></dd></div>
            <div><dt>比較可能</dt><dd>3<small>件まで</small></dd></div>
            <div><dt>データ種別</dt><dd className="demo-value">デモ</dd></div>
          </dl>
        </section>

        <div className="demo-alert" role="note">
          <strong>デモデータ</strong>
          <span>現在の商品名・価格・仕様はUI確認用です。実在商品の情報ではありません。</span>
        </div>

        <ProductsExplorer />
      </main>
      <SiteFooter />
    </>
  );
}
