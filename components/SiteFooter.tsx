import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><Link className="brand footer-brand" href="/"><span className="brand-mark">B</span><span><strong>ベッドセレクト</strong><small>施術ベッド比較データベース</small></span></Link><p>施術ベッドを条件・数値・機能から探し、横並びで比較するためのデータベース型サイトです。</p></div>
        <div><strong>商品を探す</strong><Link href="/products">商品一覧</Link><Link href="/conditions">条件別検索</Link><Link href="/compare">商品比較</Link></div>
        <div><strong>サイト情報</strong><Link href="/about">このサイトについて</Link><Link href="/advertising">広告・アフィリエイトについて</Link><Link href="/privacy">プライバシーポリシー</Link></div>
      </div>
      <div className="footer-demo"><strong>デモサイト</strong><span>商品名・メーカー名・価格・仕様・購入先は実在商品に基づく情報ではありません。</span></div>
      <small>© 2026 Bed Select. Demo data only.</small>
    </footer>
  );
}
