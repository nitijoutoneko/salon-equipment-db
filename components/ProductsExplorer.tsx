'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import BedVisual from './BedVisual';
import { products, productTypes, useCases, type ProductType, type UseCase } from '../data/products';

const storageKey = 'bed-select-comparison';

export default function ProductsExplorer() {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState<ProductType | 'すべて'>('すべて');
  const [useCase, setUseCase] = useState<UseCase | 'すべて'>('すべて');
  const [maxWidth, setMaxWidth] = useState('all');
  const [faceHole, setFaceHole] = useState(false);
  const [reclining, setReclining] = useState(false);
  const [portable, setPortable] = useState(false);
  const [sort, setSort] = useState('recommended');
  const [compared, setCompared] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        try { setCompared(JSON.parse(stored)); } catch { window.localStorage.removeItem(storageKey); }
      }
      setStorageReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => { if (storageReady) window.localStorage.setItem(storageKey, JSON.stringify(compared)); }, [compared, storageReady]);

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const text = `${product.name} ${product.tagline} ${product.type} ${product.uses.join(' ')}`.toLowerCase();
      return (!keyword || text.includes(keyword.toLowerCase()))
        && (type === 'すべて' || product.type === type)
        && (useCase === 'すべて' || product.uses.includes(useCase))
        && (maxWidth === 'all' || product.width <= Number(maxWidth))
        && (!faceHole || product.faceHole)
        && (!reclining || product.reclining)
        && (!portable || product.portable);
    });
    return [...result].sort((a, b) => sort === 'width-asc' ? a.width - b.width : sort === 'width-desc' ? b.width - a.width : a.id.localeCompare(b.id));
  }, [keyword, type, useCase, maxWidth, faceHole, reclining, portable, sort]);

  function toggleCompare(id: string) {
    if (compared.includes(id)) {
      setCompared(compared.filter((item) => item !== id));
      setMessage('');
      return;
    }
    if (compared.length >= 3) {
      setMessage('比較できるのは3商品までです。いずれかを外してください。');
      return;
    }
    setCompared([...compared, id]);
    setMessage('');
  }

  function resetFilters() {
    setKeyword(''); setType('すべて'); setUseCase('すべて'); setMaxWidth('all');
    setFaceHole(false); setReclining(false); setPortable(false);
  }

  const comparedProducts = compared.map((id) => products.find((product) => product.id === id)).filter(Boolean);

  return (
    <>
      <div className="explorer-layout">
        <aside className="filters" aria-label="商品絞り込み">
          <div className="filter-title"><h2>絞り込み</h2><button type="button" onClick={resetFilters}>リセット</button></div>
          <label className="field"><span>キーワード</span><input type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="例：電動、訪問施術" /></label>
          <fieldset><legend>昇降・設置タイプ</legend><label className="radio-row"><input type="radio" name="type" checked={type === 'すべて'} onChange={() => setType('すべて')} />すべて</label>{productTypes.map((item) => <label className="radio-row" key={item}><input type="radio" name="type" checked={type === item} onChange={() => setType(item)} />{item}</label>)}</fieldset>
          <label className="field"><span>主な用途</span><select value={useCase} onChange={(event) => setUseCase(event.target.value as UseCase | 'すべて')}><option>すべて</option>{useCases.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="field"><span>ベッド幅（デモ値）</span><select value={maxWidth} onChange={(event) => setMaxWidth(event.target.value)}><option value="all">指定なし</option><option value="65">65cm以下</option><option value="70">70cm以下</option><option value="75">75cm以下</option></select></label>
          <fieldset><legend>機能</legend><label className="check-row"><input type="checkbox" checked={faceHole} onChange={(event) => setFaceHole(event.target.checked)} />有孔タイプ</label><label className="check-row"><input type="checkbox" checked={reclining} onChange={(event) => setReclining(event.target.checked)} />リクライニング</label><label className="check-row"><input type="checkbox" checked={portable} onChange={(event) => setPortable(event.target.checked)} />持ち運び対応</label></fieldset>
        </aside>

        <section className="results" aria-live="polite">
          <div className="results-bar"><p><strong>{filtered.length}</strong> 件のデモ商品</p><label>並び順<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">おすすめ順</option><option value="width-asc">幅が小さい順</option><option value="width-desc">幅が大きい順</option></select></label></div>
          {filtered.length > 0 ? <div className="result-grid">{filtered.map((product) => {
            const isCompared = compared.includes(product.id);
            return <article className="result-card" key={product.id}>
              <Link href={`/products/${product.slug}`}><BedVisual tone={product.tone} compact /></Link>
              <div className="result-body"><div className="tag-row"><span className="pill">{product.type}</span>{product.portable && <span className="plain-tag">持ち運び</span>}</div><Link href={`/products/${product.slug}`}><h2>{product.name}</h2></Link><p className="tagline">{product.tagline}</p><dl className="mini-specs"><div><dt>幅</dt><dd>{product.width}cm</dd></div><div><dt>高さ</dt><dd>{product.minHeight}–{product.maxHeight}cm</dd></div><div><dt>用途</dt><dd>{product.uses.slice(0, 2).join('・')}</dd></div></dl><div className="card-actions"><Link className="detail-link" href={`/products/${product.slug}`}>詳しく見る <span>→</span></Link><button type="button" className={`compare-toggle ${isCompared ? 'selected' : ''}`} aria-pressed={isCompared} onClick={() => toggleCompare(product.id)}>{isCompared ? '✓ 比較中' : '＋ 比較に追加'}</button></div></div>
            </article>;
          })}</div> : <div className="empty-state"><strong>条件に合う商品がありません</strong><p>条件を減らすか、絞り込みをリセットしてみてください。</p><button type="button" className="button primary" onClick={resetFilters}>条件をリセット</button></div>}
        </section>
      </div>

      {compared.length > 0 && <aside className="compare-tray" aria-label="比較する商品"><div className="tray-copy"><span>比較リスト</span><strong>{compared.length}/3 商品</strong></div><div className="tray-items">{comparedProducts.map((product) => product && <button type="button" key={product.id} onClick={() => toggleCompare(product.id)} aria-label={`${product.name}を比較から外す`}><span className={`tray-swatch tone-${product.tone}`} />{product.shortName}<b>×</b></button>)}</div>{message && <p role="alert">{message}</p>}{compared.length >= 2 ? <Link className="button tray-button" href={`/compare?ids=${compared.join(',')}`}>選んだ商品を比較</Link> : <span className="button tray-button disabled" aria-disabled="true">あと1商品選択</span>}</aside>}
    </>
  );
}
