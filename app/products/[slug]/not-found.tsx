import Link from 'next/link';

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 NOT FOUND</p><h1>商品が見つかりません</h1><p>URLが変更されたか、商品が削除された可能性があります。</p><Link className="button primary" href="/products">商品一覧へ戻る</Link></main>;
}
