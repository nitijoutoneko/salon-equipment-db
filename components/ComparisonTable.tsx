'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BedVisual from './BedVisual';
import { products, type Product } from '../data/products';

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
    return <div className="empty-state compare-empty"><strong>比較する商品を2〜3点選んでください</strong><p>商品一覧の「比較に追加」から、気になる商品を選べます。</p><Link className="button primary" href="/products">商品を選びに行く</Link></div>;
  }

  const rows: { label: string; value: (product: Product) => string }[] = [
    { label: 'タイプ', value: (product) => product.type },
    { label: '主な用途', value: (product) => product.uses.join('・') },
    { label: '幅', value: (product) => `${product.width}cm` },
    { label: '長さ', value: (product) => `${product.length}cm` },
    { label: '高さ範囲', value: (product) => `${product.minHeight}〜${product.maxHeight}cm` },
    { label: 'フェイスホール', value: (product) => product.faceHole ? 'あり' : 'なし' },
    { label: 'リクライニング', value: (product) => product.reclining ? 'あり' : 'なし' },
    { label: '持ち運び', value: (product) => product.portable ? '対応想定' : '非対応想定' },
    { label: 'クッション', value: (product) => product.cushion },
    { label: '張地', value: (product) => product.upholstery },
  ];

  return <div className="comparison-wrap"><p className="swipe-note">横にスクロールして比較できます →</p><table className="comparison-table"><thead><tr><th scope="col">比較項目</th>{selected.map((product) => <th scope="col" key={product.id}><BedVisual tone={product.tone} compact /><span className="pill">{product.type}</span><h2>{product.name}</h2><button type="button" onClick={() => remove(product.id)}>比較から外す ×</button></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{selected.map((product) => <td key={product.id}>{row.value(product)}</td>)}</tr>)}<tr className="table-actions"><th>詳細</th>{selected.map((product) => <td key={product.id}><Link href={`/products/${product.slug}`}>商品詳細を見る →</Link></td>)}</tr></tbody></table></div>;
}
