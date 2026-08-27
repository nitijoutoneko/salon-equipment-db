import type { Metadata } from 'next';
import ComparisonTable from '../../components/ComparisonTable';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';

export const metadata: Metadata = {
  title: '施術ベッドを比較',
  description: '選んだ2〜3点の施術ベッドを、サイズ・機能・用途ごとに横並びで比較できます。',
};

export default function ComparePage() {
  return <><SiteHeader /><main className="page-main compare-page"><div className="page-heading"><div><p>商品比較</p><h1>施術ベッド比較表</h1><span>選んだ2〜3商品の価格・サイズ・機能・購入先を横並びで確認できます</span></div><strong>全商品デモデータ</strong></div><ComparisonTable /></main><SiteFooter /></>;
}
