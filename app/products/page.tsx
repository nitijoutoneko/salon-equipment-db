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
    <><SiteHeader /><main className="page-main products-page"><div className="page-heading"><div><p>商品検索</p><h1>施術ベッド商品一覧</h1><span>価格・サイズ・機能を指定して絞り込めます</span></div><strong>全商品デモデータ</strong></div><ProductsExplorer /></main><SiteFooter /></>
  );
}
