import type { Metadata } from 'next';
import ComparisonTable from '../../components/ComparisonTable';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';

export const metadata: Metadata = {
  title: '施術ベッドを比較',
  description: '選んだ2〜3点の施術ベッドを、サイズ・機能・用途ごとに横並びで比較できます。',
};

export default function ComparePage() {
  return <><SiteHeader /><main className="page-main compare-page"><div className="page-intro"><p className="eyebrow">COMPARE</p><h1>選んだ商品を比較</h1><p>サイズや機能の違いを横並びで確認できます。</p><span>※商品名・仕様値はすべてUI確認用のデモデータです。</span></div><ComparisonTable /></main><SiteFooter /></>;
}
