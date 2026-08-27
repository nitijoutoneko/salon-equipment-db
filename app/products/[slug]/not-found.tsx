import Link from 'next/link';

export default function NotFound() {
  return <main className="not-found"><p>404 NOT FOUND</p><h1>商品が見つかりません</h1><p>URLが変更されたか、商品が削除された可能性があります。</p><Link className="primary-action" href="/products">商品一覧へ戻る</Link></main>;
}
