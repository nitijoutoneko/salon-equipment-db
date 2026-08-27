import type { Metadata } from 'next';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';

export const metadata: Metadata = { title: 'プライバシーポリシー', description: 'ベッドセレクトのプライバシーポリシーです。' };

export default function PrivacyPage() {
  return <><SiteHeader /><main className="info-page"><div className="page-heading"><div><p>サイト情報</p><h1>プライバシーポリシー</h1><span>デモサイト用の基本方針</span></div></div><div className="info-content"><section><h2>アクセス情報</h2><p>将来アクセス解析を導入する場合、Cookie等を用いて匿名の利用状況を取得することがあります。個人を直接特定する目的では使用しません。</p></section><section><h2>広告配信</h2><p>広告サービスを導入する場合、広告配信事業者がCookieを使用することがあります。導入時に利用サービスと拒否方法を追記します。</p></section><section><h2>お問い合わせ情報</h2><p>問い合わせ機能を追加した場合、回答に必要な範囲で送信情報を利用します。現時点では問い合わせフォームは設置していません。</p></section><section><h2>改定</h2><p>実際の運営内容や導入サービスに合わせて本方針を更新します。</p></section></div></main><SiteFooter /></>;
}
