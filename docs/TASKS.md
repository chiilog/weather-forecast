# 天気予報アプリ タスクリスト

## 概要

このドキュメントは、天気予報アプリ開発のタスクリストです。
TDD（テスト駆動開発）のRed-Green-Refactorサイクルに従って進めます。

---

## Phase 1: 基盤構築

### 1.1 プロジェクトセットアップ

- [x] Vite + React + TypeScript プロジェクトを作成
  ```bash
  npm create vite@latest . -- --template react-ts
  ```
- [x] 不要なボイラープレートファイルを削除
- [x] `npm install` で依存関係をインストール
- [x] 開発サーバーが起動することを確認

### 1.1.1 EditorConfig・Prettier 導入

- [x] `.editorconfig` を作成
- [x] Prettier をインストール
  ```bash
  npm install -D prettier eslint-config-prettier
  ```
- [x] `.prettierrc` を作成
- [x] `.prettierignore` を作成
- [x] ESLint に eslint-config-prettier を追加
- [x] `package.json` に format スクリプトを追加

### 1.1.2 husky・lint-staged 導入

- [x] husky と lint-staged をインストール
  ```bash
  npm install -D husky lint-staged
  ```
- [x] husky を初期化
  ```bash
  npx husky init
  ```
- [x] `.husky/pre-commit` を設定（lint-staged を実行）
- [x] `package.json` に lint-staged 設定を追加

### 1.2 Tailwind CSS v4 導入

- [x] Tailwind CSS v4 をインストール（Vite プラグイン方式）
  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```
- [x] `vite.config.ts` に @tailwindcss/vite プラグインを追加
- [x] `src/index.css` に `@import "tailwindcss";` を追加
- [x] 基本スタイルが適用されることを確認

### 1.3 テスト環境構築

- [x] Vitest + Testing Library をインストール
  ```bash
  npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/coverage-v8
  ```
- [x] `vitest.config.ts` を作成
- [x] `vitest.setup.ts` を作成
- [x] `tsconfig.app.json` に型定義を追加
- [x] `package.json` にテストスクリプトを追加
- [x] サンプルテストが実行できることを確認

### 1.4 MSW導入

- [x] MSW をインストール
  ```bash
  npm install -D msw
  ```
- [x] `src/mocks/handlers.ts` を作成
- [x] `src/mocks/server.ts` を作成（テスト用）
- [x] `vitest.setup.ts` でMSWサーバーを設定

### 1.5 React Router v7 導入

- [x] React Router をインストール
  ```bash
  npm install react-router-dom
  ```
- [x] `src/pages/HomePage.tsx` を作成
- [x] `src/pages/WeatherPage.tsx` を作成
- [x] `App.tsx` に基本ルーティングを設定
- [x] `main.tsx` に BrowserRouter を設定
- [x] ルーティングが動作することを確認

### 1.6 TanStack Query v5 導入

- [x] TanStack Query をインストール
  ```bash
  npm install @tanstack/react-query
  ```
- [x] `src/lib/queryClient.ts` を作成
  - [x] staleTime: 10分
  - [x] gcTime: 30分
  - [x] retry: 4xxエラーはリトライしない、5xxは1回まで
- [x] `main.tsx` に `QueryClientProvider` を設定

### 1.7 型定義・定数定義

- [x] `src/types/city.ts` を作成
  - [x] `CityId` 型
  - [x] `City` インターフェース
- [x] `src/constants/cities.ts` を作成
  - [x] `CITIES` 配列

### 1.8 環境変数設定

- [x] `.env.local` を作成
- [x] `.env.example` を作成（テンプレート）
- [x] `VITE_OPENWEATHER_API_KEY` を設定
- [x] `src/vite-env.d.ts` に `ImportMetaEnv` 型を追加
- [x] `.gitignore` に `*.local` が含まれていることを確認

---

## Phase 2: TDDで機能実装

このフェーズでは、**コンポーネントから始めて、必要になったら関数やAPIを抽出する**という流れで実装します。

### 2.1 ホーム画面の実装

#### 2.1.1 HomePage.tsx

- [x] **Red**: HomePageのテストを作成
  - [x] タイトルが表示されるテスト
  - [x] テストが失敗することを確認
- [x] **Green**: HomePageを実装（最小構成）
  - [x] タイトルのみ表示
  - [x] テストが成功することを確認

#### 2.1.2 CityListItem.tsx

- [x] **Red**: CityListItemのテストを作成
  - [x] 地域名が表示されるテスト
  - [x] クリックで正しいURLに遷移するテスト
  - [x] テストが失敗することを確認
- [x] **Green**: CityListItemを実装
  - [x] Linkコンポーネントで `/weather/:cityId` へ遷移
  - [x] テストが成功することを確認
- [x] **Refactor**: スタイリングの調整

#### 2.1.3 CityList.tsx

- [x] **Red**: CityListのテストを作成
  - [x] CITIES配列の全地域が表示されるテスト
  - [x] テストが失敗することを確認
- [x] **Green**: CityListを実装
  - [x] CITIES定数を使用してCityListItemをマップ
  - [x] テストが成功することを確認
- [x] **Refactor**: スタイリングの調整

#### 2.1.4 HomePageにCityListを統合

- [x] HomePageにCityListを組み込む
- [x] 統合後のテストを実行
- [x] ブラウザで動作確認（`npm run dev`で確認）

---

### 2.2 天気画面の実装

#### 2.2.1 WeatherListItem.tsx

- [x] **Red**: WeatherListItemのテストを作成
  - [x] 日時が表示されるテスト
  - [x] 天気アイコンが表示されるテスト
  - [x] 気温が表示されるテスト
  - [x] テストが失敗することを確認
- [x] **Green**: WeatherListItemを実装
  - [x] propsから受け取ったデータを表示
  - [x] テストが成功することを確認
- [x] **Refactor**: スタイリングの調整

#### 2.2.2 WeatherList.tsx

- [x] **Red**: WeatherListのテストを作成
  - [x] 天気データ配列を受け取り、すべてのアイテムを表示するテスト
  - [x] テストが失敗することを確認
- [x] **Green**: WeatherListを実装
  - [x] propsのdataを使用してWeatherListItemをマップ
  - [x] テストが成功することを確認
- [x] **Refactor**: スタイリングの調整

#### 2.2.3 API層とカスタムフックの実装

> **ここでAPI取得が必要になる**

##### api/weather.ts

- [x] **Red**: `fetchWeather` のテストを作成（MSWでモック）
  - [x] 正常系：天気データを取得できるテスト
  - [x] 異常系：5xxエラー時にエラーがスローされるテスト
  - [x] テストが失敗することを確認
- [x] **Green**: `fetchWeather` を実装
  - [x] APIエンドポイントへのfetch
  - [x] レスポンスの整形（FormattedWeather型へ変換）
  - [x] エラーハンドリング
  - [x] テストが成功することを確認
- [x] **Refactor**: 必要に応じてリファクタリング

##### hooks/useWeather.ts

- [x] **Red**: `useWeather` のテストを作成
  - [x] データ取得成功時にweatherDataを返すテスト
  - [x] APIエラー時にisError=trueになるテスト
  - [x] テストが失敗することを確認
- [x] **Green**: `useWeather` を実装
  - [x] useQueryを使用してfetchWeatherを呼び出し
  - [x] テストが成功することを確認
- [x] **Refactor**: 必要に応じてリファクタリング

#### 2.2.4 WeatherPage.tsx

- [x] **Red**: WeatherPageのテストを作成
  - [x] ローディング中にスケルトンが表示されるテスト
  - [x] データ取得成功時にWeatherListが表示されるテスト
  - [x] テストが失敗することを確認
- [x] **Green**: WeatherPageを実装
  - [x] useParamsでcityIdを取得
  - [x] useWeatherでデータ取得
  - [x] ローディング状態の処理
  - [x] 成功状態：WeatherList表示
  - [x] 戻るナビゲーション
  - [x] テストが成功することを確認
- [x] **Refactor**: スタイリングの調整

---

### 2.3 エラーハンドリング

#### 2.3.1 ErrorView.tsx

- [x] **Red**: ErrorViewのテストを作成
  - [x] エラーメッセージが表示されるテスト
  - [x] ホームへ戻るリンクが表示されるテスト
  - [x] リトライボタンの表示/非表示のテスト
  - [x] テストが失敗することを確認
- [x] **Green**: ErrorViewを実装
  - [x] テストが成功することを確認
- [x] **Refactor**: PageLayoutコンポーネントへの抽出
- [x] **Enhancement**: リトライボタン機能の追加（Issue #22）
- [x] **Enhancement**: HTTPステータスコード別エラーメッセージ（Issue #21）

#### 2.3.2 WeatherSkeleton.tsx

- [x] 簡易的なローディング表示を実装
  - [x] 「読み込み中...」テキストによるローディング表示
  - [x] 将来的にスケルトンUIに置き換え可能な構造

#### 2.3.3 WeatherPageにエラーハンドリングを追加

- [x] **Red**: エラー時にErrorViewが表示されるテストを追加
  - [x] テストが失敗することを確認
- [x] **Green**: エラー状態の処理を実装
  - [x] useWeatherのisErrorをチェック
  - [x] エラー時はErrorView表示
  - [x] リトライ機能の統合
  - [x] テストが成功することを確認

---

### 2.4 結合テスト

- [x] ホーム画面 → 天気画面への遷移テスト
- [x] 天気画面 → ホーム画面への遷移テスト
- [x] キャッシュ動作の確認（同じ地域に再訪問時にAPIリクエストが発生しないこと）

---

## Phase 3: UX改善・動作確認

### 3.1 UX改善

- [x] ローディングスケルトンのアニメーション追加
- [x] リストアイテムのホバー/アクティブ状態のスタイル調整
- [ ] 画面遷移のアニメーション（余裕があれば）

### 3.2 レスポンシブ対応

- [ ] モバイル表示の確認・調整
- [ ] タブレット表示の確認・調整
- [ ] デスクトップ表示の確認・調整

### 3.3 最終動作確認

- [ ] 4地域すべての天気取得・表示を確認
- [ ] キャッシュ動作の確認（DevTools Network）
- [ ] エラー画面の動作確認
- [ ] 全テストがパスすることを確認

### 3.4 コード整理

- [ ] 未使用のインポート・変数を削除
- [ ] コンソールログを削除
- [ ] TypeScriptエラーがないことを確認
- [ ] ESLintエラーがないことを確認

### 3.5 ドキュメント

- [ ] README.md の作成
  - [ ] プロジェクト概要
  - [ ] セットアップ手順
  - [ ] 開発コマンド
  - [ ] 環境変数の説明

---

## チェックリスト（受け入れ条件）

### ホーム画面

- [x] 4地域が縦並びリストで表示される
- [x] 各地域をクリックすると `/weather/:cityId` へ遷移する
- [x] タップ/クリック時に視覚的フィードバックがある

### 天気画面

- [x] 画面表示時にOpenWeatherMap APIを呼び出す
- [x] 各予報アイテムに天気アイコン、気温(℃)、日時が表示される
- [ ] 日時は日本のタイムゾーン（JST）で表示される（現在はAPIから返されるUTC形式のまま表示）
- [x] ホーム画面へ戻るナビゲーションがある

### エラー画面

- [x] 5xx エラー時にエラー画面が表示される
- [x] ホーム画面へ戻るリンクがある
- [x] リトライボタンがある（Issue #22で追加）
- [x] HTTPステータスコード別のエラーメッセージが表示される（Issue #21で追加）

### キャッシュ機能

- [x] 一度取得した地域のデータはキャッシュから表示される
- [x] DevToolsのNetworkタブで再リクエストが発生しないことを確認できる

---

## 進捗管理

| Phase | ステータス | 完了タスク | 全タスク |
|-------|-----------|-----------|---------|
| Phase 1 | 完了 | 10 | 10 |
| Phase 2 | 完了 | 14 | 14 |
| Phase 3 | 未着手 | 0 | 5 |
| Phase 4 | 完了 | 3 | 3 |
| **合計** | - | 27 | 32 |

### Phase 2の詳細進捗

| セクション | 完了タスク | 全タスク |
|-----------|-----------|---------|
| 2.1 ホーム画面の実装 | 4 | 4 |
| 2.2 天気画面の実装 | 4 | 4 |
| 2.3 エラーハンドリング | 3 | 3 |
| 2.4 結合テスト | 3 | 3 |

---

## Phase 4: 追加実装機能（完了済み）

以下の機能は、当初の計画には含まれていませんでしたが、UX向上のために追加実装されました。

### 4.1 開発環境の改善

- [x] **Storybook 8の導入**（Issue #14）
  - [x] コンポーネントカタログの作成
  - [x] 各コンポーネントのStorybookストーリー追加
  - [x] 独立した環境でのコンポーネント開発が可能に

### 4.2 エラーハンドリングの強化

- [x] **HTTPステータスコード別エラーメッセージ**（Issue #21）
  - [x] `src/lib/errorMessages.ts` を作成
  - [x] 401, 404, 429, 500 の各ステータスコード別にメッセージを表示
  - [x] テストケースを追加
- [x] **リトライボタンの追加**（Issue #22）
  - [x] ErrorViewにリトライボタンを追加
  - [x] `onRetry`コールバック機能を実装
  - [x] WeatherPageでrefetch関数と統合
- [x] **JSONパースエラーハンドリング**（Issue #23）
  - [x] 実装検討を実施
  - [x] YAGNI原則に基づき、現時点では実装しない判断
  - [x] `wontfix`としてクローズ

### 4.3 コンポーネントのリファクタリング

- [x] **PageLayoutコンポーネントの抽出**
  - [x] 共通レイアウトをPageLayoutコンポーネントとして分離
  - [x] ErrorViewとWeatherPageで再利用
  - [x] Storybookストーリーを追加
  - [x] JSXの重複を削減

---

## 注意事項

1. **TDDサイクルを守る**: 必ず「テストを書く → 実装 → リファクタリング」の順序で進める
2. **小さなステップで進む**: 一度に大きな変更をしない
3. **頻繁にコミット**: 各タスク完了ごとにコミットする
4. **リファクタリングは慎重に**: 過度な抽象化を避ける
5. **APIキーの管理**: `.env.local` に保存し、絶対にコミットしない
6. **コンポーネントから始める**: ユーティリティ関数やAPIは、コンポーネントで必要になったタイミングで作成する（YAGNI原則）
7. **必要性が明確になってから抽出**: 最初はコンポーネント内に書いて、重複や複雑さが見えてから関数化する
