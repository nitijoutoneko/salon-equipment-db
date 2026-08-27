import Link from 'next/link';

export default function SiteHeader() {
  return (
    <>
      <div className="data-disclaimer">掲載情報はすべてUI確認用のデモデータです</div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="ベッドセレクト ホーム">
          <span className="brand-mark">B</span>
          <span><strong>ベッドセレクト</strong><small>施術ベッド比較データベース</small></span>
        </Link>
        <nav aria-label="メインナビゲーション">
          <Link href="/products">商品を探す</Link>
          <Link href="/conditions">条件別検索</Link>
          <Link href="/compare">比較表</Link>
          <Link href="/about">サイトについて</Link>
        </nav>
        <Link className="header-compare" href="/compare"><span>⇄</span> 比較する</Link>
      </header>
    </>
  );
}
