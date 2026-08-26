import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/"><span className="brand-mark">B</span><span>ベッドセレクト</span></Link>
        <p>サロン・整体・エステ向け<br />施術ベッド比較ガイド</p>
      </div>
      <div className="footer-links"><Link href="/products">商品一覧</Link><Link href="/compare">商品比較</Link><Link href="/#guide">選び方</Link></div>
      <div className="footer-note"><strong>DEMO SITE</strong><p>掲載中の商品名・仕様・説明はすべてUI確認用のダミーデータです。実在の商品・事業者とは関係ありません。</p></div>
      <small>© 2026 Bed Select. Demo data only.</small>
    </footer>
  );
}
