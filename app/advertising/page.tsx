import type { Metadata } from 'next';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';

export const metadata: Metadata = { title: '広告・アフィリエイトについて', description: '広告掲載とアフィリエイトリンクの運用方針です。' };

export default function AdvertisingPage() {
  return <><SiteHeader /><main className="info-page"><div className="page-heading"><div><p>運営方針</p><h1>広告・アフィリエイトについて</h1><span>比較結果と広告を明確に区別します</span></div></div><div className="info-content"><section><h2>広告掲載方針</h2><p>将来、Google AdSense、ASPの広告、メーカー直接広告を掲載する可能性があります。広告枠には「広告」または「PR」と表示します。</p></section><section><h2>アフィリエイトリンク</h2><p>購入リンクを経由して商品が購入された場合、運営者が紹介料を受け取る場合があります。紹介料の有無によって商品スペックを変更したり、根拠のない順位を付けたりしません。</p></section><section><h2>現在の状態</h2><div className="policy-notice"><strong>広告・購入URLは未登録です</strong><p>画面内の広告枠と購入先欄は、将来の実装位置を確認するためのプレースホルダーです。</p></div></section></div></main><SiteFooter /></>;
}
