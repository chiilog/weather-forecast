# 天気予報アプリ

React 19 + TypeScript + Viteで構築された、シンプルな天気予報アプリケーションです。OpenWeatherMap APIを使用して、日本国内の主要4地域（東京、兵庫、大分、北海道）の5日間の天気予報を3時間ごとに表示します。

## 特徴

- **React 19**: 最新のReactを採用
- **TypeScript**: 型安全性を重視した開発
- **TanStack Query**: 効率的なデータフェッチとキャッシュ管理
- **Tailwind CSS v4**: モダンなスタイリング
- **Vitest + Testing Library**: 包括的なテストカバレッジ
- **MSW**: APIモッキングによる独立したテスト環境
- **Storybook**: コンポーネントの視覚的な開発・テスト

## 技術スタック

| 用途 | ライブラリ | バージョン |
|------|----------|---------|
| フレームワーク | React | 19.2.0 |
| ルーティング | react-router-dom | 7.12.0 |
| 状態管理 | @tanstack/react-query | 5.90.19 |
| スタイリング | tailwindcss | 4.1.18 |
| ビルドツール | Vite | 7.2.4 |
| テスト | vitest | 4.0.17 |
| APIモック | msw | 2.12.7 |
| コンポーネント開発 | Storybook | 10.2.0 |

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd weather-forecast
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

プロジェクトルートに`.env.local`ファイルを作成し、OpenWeatherMap APIキーを設定します。

```bash
# .env.localファイルを作成
cp .env.example .env.local
```

`.env.local`の内容：

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

**APIキーの取得方法:**
1. [OpenWeatherMap](https://openweathermap.org/)にアクセス
2. アカウントを作成
3. [API Keys](https://home.openweathermap.org/api_keys)ページでAPIキーを生成
4. 生成されたAPIキーを`.env.local`に設定

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリケーションを確認できます。

## 開発コマンド

### 基本コマンド

```bash
# 開発サーバー起動（Vite）
npm run dev

# 本番ビルド（TypeScriptコンパイル + Viteビルド）
npm run build

# ビルド後のプレビュー
npm run preview
```

### コード品質

```bash
# ESLintによる検証
npm run lint

# Prettierによる自動フォーマット
npm run format

# フォーマットのチェック（CIで使用）
npm run format:check
```

### テスト

```bash
# テスト（watch mode）
npm test

# テストを一度だけ実行
npm run test:run

# カバレッジレポート生成
npm run test:coverage
```

### Storybook

```bash
# Storybook起動
npm run storybook

# Storybookビルド
npm run build-storybook
```

## プロジェクト構成

```
weather-forecast/
├── src/
│   ├── api/              # API通信層
│   ├── components/       # Reactコンポーネント
│   ├── constants/        # 定数定義
│   ├── hooks/            # カスタムフック
│   ├── lib/              # ライブラリ設定・ユーティリティ
│   ├── mocks/            # MSWハンドラー
│   ├── pages/            # ページコンポーネント
│   ├── types/            # TypeScript型定義
│   ├── utils/            # ユーティリティ関数
│   ├── App.tsx           # アプリケーションルート
│   └── main.tsx          # エントリーポイント
├── .claude/              # Claude Code設定
├── docs/                 # ドキュメント
├── .env.example          # 環境変数テンプレート
├── .env.local            # 環境変数（gitignore対象）
├── vitest.config.ts      # Vitest設定
├── vite.config.ts        # Vite設定
└── package.json
```

## 機能

### ホーム画面

- 4地域（東京、兵庫、大分、北海道）を縦並びリストで表示
- 各地域をクリックすると天気詳細画面へ遷移
- タップ/クリック時の視覚的フィードバック

### 天気詳細画面

- 5日間の3時間ごとの天気予報を表示（最大40件）
- 各予報アイテムに以下を表示：
  - 天気アイコン
  - 天気の説明（日本語）
  - 気温（℃）
  - 日時
- 日付セクションで見やすくグループ化
- ホーム画面へ戻るナビゲーション

### エラーハンドリング

- HTTPステータスコード別のエラーメッセージ
  - 401: APIキー無効
  - 404: データが見つからない
  - 429: レート制限超過
  - 500: サーバーエラー
- リトライボタンによる再取得
- ホーム画面への戻るリンク

### キャッシュ機能

- TanStack Queryによるデータキャッシュ
- 一度取得した地域のデータはキャッシュから即座に表示
- キャッシュ有効期限: 10分
- ガベージコレクション: 30分

## 開発方針

- **YAGNI原則**: 今必要のない機能は実装しない
- **Baby steps**: 小さく確実に進む、一度に多くを変更しない
- **TDD実践**: t-wadaスタイルのテスト駆動開発
- **型安全性重視**: TypeScript strictモード、地域IDはリテラル型で制限
- **テストカバレッジ**: 74テスト、包括的なテストスイート

## コーディング規約

### 型安全性

- strict mode必須
- any型使用禁止（unknown型を使用）
- リテラル型を積極的に使用

### 命名規則

- ファイル名: PascalCase（コンポーネント）、camelCase（ユーティリティ）
- コンポーネント: PascalCase
- 関数: camelCase
- 定数: UPPER_SNAKE_CASE（エクスポートする定数のみ）
- 型: PascalCase

### インポート順序

1. React関連
2. 外部ライブラリ
3. 内部モジュール（types, constants, lib等）
4. 相対パス

## ライセンス

このプロジェクトは学習目的で作成されました。

## 注意事項

- APIキー（`.env.local`）は機密情報です。Gitにコミットしないよう注意してください
- 無料プランには1分あたりのリクエスト数制限があります
- 本番環境では適切なキャッシュとレート制限の実装を推奨します
