import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';

export const metadata: Metadata = { title: '条件別に施術ベッドを探す', description: '施術内容や昇降方式、設置条件から施術ベッドを検索できます。' };

const groups = [
  { title: '施術内容から探す', items: [['整体向け','/products?use=整体','幅と高さ、耐荷重を比較'],['リラクゼーション向け','/products?use=リラクゼーション','クッションと施術面を比較'],['エステ向け','/products?use=エステ','幅とリクライニングを比較'],['フェイシャル向け','/products?use=フェイシャル','背上げ機能を比較'],['訪問施術向け','/products?use=訪問施術','重量と折りたたみを比較']] },
  { title: '昇降方式から探す', items: [['電動ベッド','/products?lift=電動','高さ調整のしやすさを重視'],['手動ベッド','/products?lift=手動','価格と機能のバランス'],['固定式ベッド','/products?lift=固定','シンプルな常設モデル']] },
];

export default function ConditionsPage() {
  return <><SiteHeader /><main className="page-main"><div className="page-heading"><div><p>条件別検索</p><h1>目的から施術ベッドを探す</h1><span>選んだ条件を商品一覧へ引き継ぎます</span></div><strong>デモデータ</strong></div><div className="condition-groups">{groups.map((group) => <section key={group.title}><h2>{group.title}</h2><div>{group.items.map(([name,url,note]) => <Link href={url} key={name}><strong>{name}</strong><span>{note}</span><b>商品を見る →</b></Link>)}</div></section>)}</div></main><SiteFooter /></>;
}
