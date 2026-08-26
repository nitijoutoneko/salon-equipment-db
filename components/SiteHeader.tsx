import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="ベッドセレクト ホーム">
        <span className="brand-mark">B</span>
        <span>ベッドセレクト</span>
      </Link>
      <nav aria-label="メインナビゲーション">
        <Link href="/products">商品を探す</Link>
        <Link href="/#guide">選び方</Link>
        <Link href="/compare">比較する</Link>
      </nav>
      <Link className="header-cta" href="/products">絞り込み検索</Link>
    </header>
  );
}
