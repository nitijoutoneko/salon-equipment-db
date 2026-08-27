'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatPrice, products, type Product } from '../data/products';
import BedVisual from './BedVisual';

const storageKey = 'bed-select-comparison';

export default function ComparisonTable() {
  const [selected, setSelected] = useState<Product[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const queryIds = new URLSearchParams(window.location.search).get('ids')?.split(',').filter(Boolean) || [];
      let ids = queryIds;
      if (ids.length === 0) {
        try { ids = JSON.parse(window.localStorage.getItem(storageKey) || '[]'); } catch { ids = []; }
      }
      setSelected(ids.slice(0, 3).map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product)));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function remove(id: string) {
    const next = selected.filter((product) => product.id !== id);
    setSelected(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next.map((product) => product.id)));
    window.history.replaceState({}, '', next.length ? `/compare?ids=${next.map((product) => product.id).join(',')}` : '/compare');
  }

  if (selected.length < 2) {
    return <div className="empty-state compare-empty"><strong>比較する商品を2〜3点選んでください</strong><p>商品一覧で「比較に追加」を押すと、ここに横並びで表示されます。</p><Link className="primary-action" href="/products">商品一覧から選ぶ</Link></div>;
  }

  const rows: { label: string; value: (product: Product) => React.ReactNode; important?: boolean }[] = [
    { label: '参考価格（デモ）', value: (p) => formatPrice(p.price), important: true },
    { label: 'メーカー', value: (p) => p.manufacturer },
    { label: '型番', value: (p) => p.modelNumber },
    { label: '幅', value: (p) => `${p.width}cm` },
    { label: '長さ', value: (p) => `${p.length}cm` },
    { label: '最低高さ', value: (p) => `${p.minHeight}cm` },
    { label: '最高高さ', value: (p) => `${p.maxHeight}cm` },
    { label: '重量', value: (p) => `${p.weight}kg` },
    { label: '耐荷重', value: (p) => `${p.loadCapacity}kg` },
    { label: '昇降方式', value: (p) => p.liftType },
    { label: '電動昇降', value: (p) => p.electricLift ? 'あり' : 'なし' },
    { label: 'リクライニング', value: (p) => p.reclining ? 'あり' : 'なし' },
    { label: 'クッション厚', value: (p) => `${p.cushionThickness}cm` },
    { label: '整体向き', value: (p) => p.uses.includes('整体') ? '●' : '―' },
    { label: 'リラク向き', value: (p) => p.uses.includes('リラクゼーション') ? '●' : '―' },
    { label: 'エステ向き', value: (p) => p.uses.includes('エステ') ? '●' : '―' },
    { label: 'フェイシャル向き', value: (p) => p.uses.includes('フェイシャル') ? '●' : '―' },
    { label: '特徴', value: (p) => p.featureSummary },
    { label: '購入先', value: () => <span className="unregistered">URL未登録</span> },
  ];

  return (
    <div className="comparison-wrap">
      <p className="swipe-note">← 横にスクロールして比較できます →</p>
      <table className="comparison-table">
        <thead><tr><th scope="col">比較項目</th>{selected.map((product) => <th scope="col" key={product.id}><BedVisual tone={product.tone} compact reclining={product.reclining} portable={product.portable} /><span className="demo-badge">デモデータ</span><small>{product.manufacturer}</small><h2>{product.name}</h2><button type="button" onClick={() => remove(product.id)}>比較から外す ×</button></th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr className={row.important ? 'important-row' : ''} key={row.label}><th scope="row">{row.label}</th>{selected.map((product) => <td key={product.id}>{row.value(product)}</td>)}</tr>)}<tr className="table-actions"><th>商品詳細</th>{selected.map((product) => <td key={product.id}><Link href={`/products/${product.slug}`}>詳細・購入先を見る</Link></td>)}</tr></tbody>
      </table>
    </div>
  );
}
