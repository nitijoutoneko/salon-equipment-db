import type { Metadata } from 'next';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';

export const metadata: Metadata = { title: 'このサイトについて', description: 'ベッドセレクトの目的、掲載方針、データの扱いについて説明します。' };

export default function AboutPage() {
  return <><SiteHeader /><main className="info-page"><div className="page-heading"><div><p>サイト情報</p><h1>このサイトについて</h1><span>比較データベースとしての目的と掲載方針</span></div></div><div className="info-content"><section><h2>目的</h2><p>ベッドセレクトは、サロン・整体・エステ向け施術ベッドを、価格・サイズ・機能・用途から探して比較するための商品データベース型サイトです。</p></section><section><h2>情報の見せ方</h2><ul><li>商品を同じ項目で比較できる形式に統一します。</li><li>文章よりも数値・表・購入先を優先します。</li><li>根拠のないランキングや口コミは掲載しません。</li></ul></section><section><h2>現在の掲載情報</h2><div className="policy-notice"><strong>現在はすべてデモデータです</strong><p>商品名、メーカー、型番、価格、仕様、購入先は実在商品の情報ではありません。実データへの移行時はメーカー公式資料等で確認し、確認日と出典を管理します。</p></div></section></div></main><SiteFooter /></>;
}
