'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const storageKey = 'bed-select-comparison';

export default function DetailCompareButton({ productId }: { productId: string }) {
  const [ids, setIds] = useState<string[]>([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setIds(JSON.parse(window.localStorage.getItem(storageKey) || '[]')); } catch { setIds([]); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggle() {
    const selected = ids.includes(productId);
    if (!selected && ids.length >= 3) { setNotice('比較できるのは3商品までです。'); return; }
    const next = selected ? ids.filter((id) => id !== productId) : [...ids, productId];
    setIds(next); window.localStorage.setItem(storageKey, JSON.stringify(next)); setNotice('');
  }

  const selected = ids.includes(productId);
  return <div className="detail-compare"><button type="button" className={`button compare-detail-button ${selected ? 'selected' : ''}`} onClick={toggle}>{selected ? '✓ 比較リストに追加済み' : '＋ 比較リストに追加'}</button>{ids.length >= 2 && <Link href={`/compare?ids=${ids.join(',')}`}>現在の{ids.length}商品を比較する →</Link>}{notice && <p role="alert">{notice}</p>}</div>;
}
