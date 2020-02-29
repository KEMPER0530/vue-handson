# Vue.js ポートフォリオ 最終更新日:1/28

Vue.js で実装しております。HTTPS化しました。
詳しくはこちらをご覧ください。<br>
ユニットテストはjestを利用しています。
<https://kemper0530.com>

GoAPIはこちら<br>
<https://github.com/KEMPER0530/go-handson>

## 構成図
![Architecture Diagram](https://d3p7ybpyhwl4ka.cloudfront.net/static/img/aws-Diagram.svg)

## 開発環境
- Vue.js
- Node.js Ver 11.14.0
- Yarn Ver 1.15.2
- Go 1.13.4
- Mysql 5.7
- Docker
- Firebase

## 機能一覧
- ログイン
- TOPページをp5.jsでビジュアルコーディングの実施
- 整列、カウンター(ログインを実施しないと当機能へ遷移できないようにしています)
- 参照データはGoAPIを通じて、リクエストを発行し、データ取得を行います。
- vuexを利用してログイン状態、メンバーの身長状態を管理
- ぐるなびAPIを利用した検索機能
- クレジットカード情報の登録機能
- お問合せフォームの作成(AWS SESを利用してメール配信)
- アカウント作成機能の追加
- ぐるなびAPI検索にて、神奈川エリア、東京エリアの選択を可能にする
- リバースプロキシ用にnginxを投入
- ELBを利用してアプリをHTTPS化
- APIリクエストにJWTを利用
- ログイン後にSMS認証の実施
- メールリンク認証の実施

## 本番環境
- AWS(EC2にDockerを配置し、nginx(Docker)経由でアプリへアクセス)
- Route53
- S3
- RDS
- CloudFront
- SES
- Firebase

## 今後実装したいこと
- CIの導入、テスト、デプロイの自動化
- AWSのその他の機能使用（S3等）
