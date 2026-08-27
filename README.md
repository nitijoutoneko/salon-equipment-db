# ベッドセレクト（MVP）

サロン・整体・エステ向け施術ベッドを、価格・サイズ・機能から検索して比較する商品データベース型サイトです。商品を探す、条件で絞る、2〜3商品を比較する、詳細と購入先を確認する、という流れを実装しています。

> **重要**：掲載中の商品名・仕様・説明はすべてUI確認用のダミーデータです。実在の商品・メーカー・事業者とは関係ありません。

## 主な機能

- キーワード、参考価格、昇降方式、用途、幅、長さ、高さ、重量、耐荷重、機能による絞り込み検索
- 価格・主要スペック・対応施術を一覧できるデータベース型の商品カード
- 2〜3商品の価格、寸法、重量、耐荷重、機能、購入先を横並びにする比較表
- スペック表、メリット、注意点、類似商品、価格帯候補、購入先をまとめた商品詳細ページ
- 複数の購入先・アフィリエイトURLを商品データ側で管理できる構造
- 条件別検索、このサイトについて、広告方針、プライバシーポリシー
- 将来の広告掲載位置を確認できる控えめな広告枠
- スマートフォン対応
- ページごとのタイトル・説明、OG画像、robots.txt、sitemap.xml
- Cloudflare Workers + Static Assets向けのビルド

## 商品を追加・編集する場所

商品データは `data/products.ts` にまとめています。メーカー、商品名、型番、画像、価格、幅、長さ、高さ、重量、耐荷重、昇降方式、リクライニング、クッション厚、対応施術、特徴、メリット、注意点、複数の購入URLを1商品単位で登録できます。既存データを複製し、`id` と `slug` が重複しないように変更すれば、一覧・詳細・比較へ自動的に反映されます。

実在商品へ置き換える際は、メーカー公式資料などで価格・寸法・耐荷重・保証条件を確認し、出典と確認日も管理してください。

## 手元で確認する

Node.js 22.13以上と pnpm を使います。

```bash
pnpm install
pnpm dev
```

表示された `http://localhost:3000` をブラウザで開きます。

## GitHubへアップロードする

### ブラウザだけで行う場合

1. GitHubで空の `salon-equipment-db` リポジトリを開きます。
2. **Add file** → **Upload files** を選びます。
3. このフォルダ内のファイル一式をアップロードします。`node_modules`、`dist`、`.wrangler` は不要です。
4. **Commit changes** を押します。

### Gitを使う場合

```bash
git init
git add .
git commit -m "Initial salon equipment comparison MVP"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/salon-equipment-db.git
git push -u origin main
```

## Cloudflare Workersで公開する

この構成は、Cloudflare ViteプラグインがWorker本体とStatic Assetsを一緒に生成します。

1. Cloudflareダッシュボードで **Workers & Pages** を開きます。
2. Workerの作成画面からGitHubを接続し、`salon-equipment-db` を選びます。
3. Production branchを `main` にします。
4. Build commandを `pnpm build` にします。
5. Deploy commandを `pnpm exec wrangler deploy` にします。
6. 保存してデプロイします。
7. 最初の公開後、Cloudflareで発行されたURLを環境変数 `NEXT_PUBLIC_SITE_URL` に設定して再デプロイします。これでOG画像とsitemapのURLが公開先に合います。

手元の端末から直接公開する場合は、Cloudflareへログイン後に次を実行します。

```bash
pnpm deploy
```

Cloudflare公式資料： [Git連携](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/) / [Workers Buildsの設定](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) / [Static Assets](https://developers.cloudflare.com/workers/static-assets/)

## 公開前に実データへ移行するときの確認事項

- 商品名、型番、メーカー名、価格、寸法、耐荷重、保証条件を公式情報で確認
- 価格の税込・送料・組立費・地域差を明記
- 商品画像の使用許諾を確認
- 比較基準と掲載ポリシーを公開
- アフィリエイトリンクを使う場合は広告表示を追加
