import type { Metadata } from 'next';
import ProductsExplorer from '../../components/ProductsExplorer';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';

export const metadata: Metadata = {
  title: '施術ベッド一覧・絞り込み検索',
  description: '用途、設置タイプ、サイズ、機能から施術ベッドのデモ商品を絞り込み、最大3商品を比較できます。',
};

export default function ProductsPage() {
  return (
    <><SiteHeader /><main className="page-main products-page"><div className="page-intro"><p className="eyebrow">PRODUCT FINDER</p><h1>施術ベッドを探す</h1><p>用途や設置スペースに合わせて、条件を絞り込んでください。</p><span>※商品名・仕様値はすべてUI確認用のデモデータです。</span></div><ProductsExplorer /></main><SiteFooter /></>
  );
}
