'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { formatPrice, liftTypes, products, useCases, type LiftType, type UseCase } from '../data/products';
import BedVisual from './BedVisual';

const storageKey = 'bed-select-comparison';

export default function ProductsExplorer() {
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState('all');
  const [liftType, setLiftType] = useState<LiftType | 'すべて'>('すべて');
  const [useCase, setUseCase] = useState<UseCase | 'すべて'>('すべて');
  const [maxWidth, setMaxWidth] = useState('all');
  const [maxLength, setMaxLength] = useState('all');
  const [maxLowHeight, setMaxLowHeight] = useState('all');
  const [maxWeight, setMaxWeight] = useState('all');
  const [minLoad, setMinLoad] = useState('all');
  const [electricLift, setElectricLift] = useState(false);
  const [reclining, setReclining] = useState(false);
  const [portable, setPortable] = useState(false);
  const [sort, setSort] = useState('price-asc');
  const [compared, setCompared] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const query = new URLSearchParams(window.location.search);
      const queryUse = query.get('use');
      const queryLift = query.get('lift');
      if (useCases.includes(queryUse as UseCase)) setUseCase(queryUse as UseCase);
      if (liftTypes.includes(queryLift as LiftType)) setLiftType(queryLift as LiftType);
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        try { setCompared(JSON.parse(stored)); } catch { window.localStorage.removeItem(storageKey); }
      }
      setStorageReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (storageReady) window.localStorage.setItem(storageKey, JSON.stringify(compared));
  }, [compared, storageReady]);

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const text = `${product.manufacturer} ${product.name} ${product.modelNumber} ${product.featureSummary} ${product.uses.join(' ')}`.toLowerCase();
      return (!keyword || text.includes(keyword.trim().toLowerCase()))
        && (maxPrice === 'all' || product.price <= Number(maxPrice))
        && (liftType === 'すべて' || product.liftType === liftType)
        && (useCase === 'すべて' || product.uses.includes(useCase))
        && (maxWidth === 'all' || product.width <= Number(maxWidth))
        && (maxLength === 'all' || product.length <= Number(maxLength))
        && (maxLowHeight === 'all' || product.minHeight <= Number(maxLowHeight))
        && (maxWeight === 'all' || product.weight <= Number(maxWeight))
        && (minLoad === 'all' || product.loadCapacity >= Number(minLoad))
        && (!electricLift || product.electricLift)
        && (!reclining || product.reclining)
        && (!portable || product.portable);
    });
    return [...result].sort((a, b) => {
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'width-asc') return a.width - b.width;
      if (sort === 'weight-asc') return a.weight - b.weight;
      if (sort === 'load-desc') return b.loadCapacity - a.loadCapacity;
      return a.price - b.price;
    });
  }, [keyword, maxPrice, liftType, useCase, maxWidth, maxLength, maxLowHeight, maxWeight, minLoad, electricLift, reclining, portable, sort]);

  const activeFilterCount = [maxPrice !== 'all', liftType !== 'すべて', useCase !== 'すべて', maxWidth !== 'all', maxLength !== 'all', maxLowHeight !== 'all', maxWeight !== 'all', minLoad !== 'all', electricLift, reclining, portable].filter(Boolean).length;

  function resetFilters() {
    setKeyword(''); setMaxPrice('all'); setLiftType('すべて'); setUseCase('すべて'); setMaxWidth('all'); setMaxLength('all');
    setMaxLowHeight('all'); setMaxWeight('all'); setMinLoad('all'); setElectricLift(false); setReclining(false); setPortable(false);
  }

  function toggleCompare(id: string) {
    if (compared.includes(id)) { setCompared(compared.filter((item) => item !== id)); setMessage(''); return; }
    if (compared.length >= 3) { setMessage('比較できるのは3商品までです。いずれかを外してください。'); return; }
    setCompared([...compared, id]); setMessage('');
  }

  const comparedProducts = compared.map((id) => products.find((product) => product.id === id)).filter(Boolean);

  return (
    <div className="catalog-explorer">
      <form className="catalog-search" onSubmit={(event) => event.preventDefault()} role="search">
        <label htmlFor="product-keyword">商品名・メーカー・型番から検索</label>
        <div><input id="product-keyword" type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="例：電動、A-101、フェイシャル" /><button type="submit">検索</button></div>
        <nav aria-label="クイック検索"><span>よく使う条件：</span><button type="button" onClick={() => setLiftType('電動')}>電動</button><button type="button" onClick={() => setUseCase('整体')}>整体向け</button><button type="button" onClick={() => setUseCase('エステ')}>エステ向け</button><button type="button" onClick={() => setPortable(true)}>折りたたみ</button></nav>
      </form>

      <div className="explorer-layout">
        <aside className="filters" aria-label="商品絞り込み">
          <div className="filter-title"><h2>条件で絞り込む</h2>{activeFilterCount > 0 && <span>{activeFilterCount}</span>}<button type="button" onClick={resetFilters}>すべて解除</button></div>

          <label className="filter-field"><span>参考価格（デモ）</span><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}><option value="all">指定なし</option><option value="50000">5万円以下</option><option value="100000">10万円以下</option><option value="150000">15万円以下</option><option value="200000">20万円以下</option><option value="300000">30万円以下</option></select></label>

          <fieldset><legend>昇降方式</legend><label className="radio-row"><input type="radio" name="lift" checked={liftType === 'すべて'} onChange={() => setLiftType('すべて')} />すべて</label>{liftTypes.map((item) => <label className="radio-row" key={item}><input type="radio" name="lift" checked={liftType === item} onChange={() => setLiftType(item)} />{item}</label>)}</fieldset>

          <label className="filter-field"><span>向いている施術</span><select value={useCase} onChange={(event) => setUseCase(event.target.value as UseCase | 'すべて')}><option>すべて</option>{useCases.map((item) => <option key={item}>{item}</option>)}</select></label>

          <fieldset className="check-group"><legend>機能</legend><label className="check-row"><input type="checkbox" checked={electricLift} onChange={(event) => setElectricLift(event.target.checked)} />電動昇降あり</label><label className="check-row"><input type="checkbox" checked={reclining} onChange={(event) => setReclining(event.target.checked)} />リクライニングあり</label><label className="check-row"><input type="checkbox" checked={portable} onChange={(event) => setPortable(event.target.checked)} />折りたたみ・持ち運び</label></fieldset>

          <details open><summary>サイズ・性能</summary><label className="filter-field"><span>ベッド幅</span><select value={maxWidth} onChange={(event) => setMaxWidth(event.target.value)}><option value="all">指定なし</option><option value="60">60cm以下</option><option value="65">65cm以下</option><option value="70">70cm以下</option><option value="75">75cm以下</option><option value="80">80cm以下</option></select></label><label className="filter-field"><span>ベッド長</span><select value={maxLength} onChange={(event) => setMaxLength(event.target.value)}><option value="all">指定なし</option><option value="180">180cm以下</option><option value="185">185cm以下</option><option value="190">190cm以下</option></select></label><label className="filter-field"><span>最低高さ</span><select value={maxLowHeight} onChange={(event) => setMaxLowHeight(event.target.value)}><option value="all">指定なし</option><option value="45">45cm以下</option><option value="50">50cm以下</option><option value="55">55cm以下</option></select></label><label className="filter-field"><span>本体重量</span><select value={maxWeight} onChange={(event) => setMaxWeight(event.target.value)}><option value="all">指定なし</option><option value="20">20kg以下</option><option value="40">40kg以下</option><option value="60">60kg以下</option></select></label><label className="filter-field"><span>耐荷重</span><select value={minLoad} onChange={(event) => setMinLoad(event.target.value)}><option value="all">指定なし</option><option value="130">130kg以上</option><option value="150">150kg以上</option><option value="180">180kg以上</option><option value="200">200kg以上</option></select></label></details>
        </aside>

        <section className="results" aria-live="polite">
          <div className="results-bar"><div><h2>施術ベッド商品一覧</h2><p><strong>{filtered.length}</strong>件見つかりました</p></div><label>並び順<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="price-asc">価格が安い順</option><option value="price-desc">価格が高い順</option><option value="width-asc">幅が狭い順</option><option value="weight-asc">重量が軽い順</option><option value="load-desc">耐荷重が大きい順</option></select></label></div>

          {filtered.length > 0 ? <div className="catalog-list">{filtered.map((product) => {
            const isCompared = compared.includes(product.id);
            return <article className="catalog-card" key={product.id}>
              <label className="card-compare-check"><input type="checkbox" checked={isCompared} onChange={() => toggleCompare(product.id)} />比較</label>
              <Link className="catalog-image-link" href={`/products/${product.slug}`}><BedVisual tone={product.tone} compact reclining={product.reclining} portable={product.portable} /></Link>
              <div className="catalog-card-main"><div className="maker-line"><span>{product.manufacturer}</span><b>デモデータ</b></div><Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link><p className="model-number">型番：{product.modelNumber}</p><p className="feature-summary">{product.featureSummary}</p><div className="use-tags">{product.uses.map((item) => <span key={item}>{item}</span>)}</div></div>
              <div className="catalog-card-specs"><dl><div><dt>幅</dt><dd>{product.width}<small>cm</small></dd></div><div><dt>長さ</dt><dd>{product.length}<small>cm</small></dd></div><div><dt>高さ</dt><dd>{product.minHeight}–{product.maxHeight}<small>cm</small></dd></div><div><dt>重量</dt><dd>{product.weight}<small>kg</small></dd></div><div><dt>耐荷重</dt><dd>{product.loadCapacity}<small>kg</small></dd></div><div><dt>昇降</dt><dd className="text-spec">{product.liftType}</dd></div></dl><div className="feature-flags"><span className={product.electricLift ? 'yes' : 'no'}>{product.electricLift ? '●' : '―'} 電動昇降</span><span className={product.reclining ? 'yes' : 'no'}>{product.reclining ? '●' : '―'} リクライニング</span></div></div>
              <div className="catalog-card-buy"><span>参考価格<small>（デモ）</small></span><strong>{formatPrice(product.price)}</strong><em>購入先URL 未登録</em><Link className="detail-button" href={`/products/${product.slug}`}>詳細・購入先を見る</Link><button type="button" className={`compare-button ${isCompared ? 'selected' : ''}`} onClick={() => toggleCompare(product.id)}>{isCompared ? '✓ 比較に追加済み' : '＋ 比較に追加'}</button></div>
            </article>;
          })}</div> : <div className="empty-state"><strong>条件に合う商品がありません</strong><p>条件を減らすか、すべて解除してください。</p><button type="button" className="primary-action" onClick={resetFilters}>条件をすべて解除</button></div>}

          <aside className="ad-slot" aria-label="広告掲載予定枠"><span>AD</span><div><strong>広告掲載予定枠</strong><p>メーカー広告や比較サービス向けの控えめな掲載スペースです。</p></div></aside>
        </section>
      </div>

      {compared.length > 0 && <aside className="compare-tray" aria-label="比較する商品"><div className="tray-copy"><span>比較リスト</span><strong>{compared.length}/3商品</strong></div><div className="tray-items">{comparedProducts.map((product) => product && <button type="button" key={product.id} onClick={() => toggleCompare(product.id)} aria-label={`${product.name}を比較から外す`}>{product.shortName}<b>×</b></button>)}</div>{message && <p role="alert">{message}</p>}{compared.length >= 2 ? <Link className="tray-button" href={`/compare?ids=${compared.join(',')}`}>比較表を見る</Link> : <span className="tray-button disabled" aria-disabled="true">あと1商品選択</span>}</aside>}
    </div>
  );
}
