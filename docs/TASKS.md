# 天気予報アプリ タスクリスト

## 概要

このドキュメントは、天気予報アプリ開発のタスクリストです。
TDD（テスト駆動開発）のRed-Green-Refactorサイクルに従って進めます。

---

## Phase 1: 基盤構築

### 1.1 プロジェクトセットアップ

- [ ] Vite + React + TypeScript プロジェクトを作成
  ```bash
  npm create vite@latest . -- --template react-ts
  ```
- [ ] 不要なボイラープレートファイルを削除
- [ ] `npm install` で依存関係をインストール
- [ ] 開発サーバーが起動することを確認

### 1.2 Tailwind CSS導入

- [ ] Tailwind CSS をインストール
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- [ ] `tailwind.config.js` を設定
- [ ] `src/index.css` に Tailwind ディレクティブを追加
- [ ] 基本スタイルが適用されることを確認

### 1.3 テスト環境構築

- [ ] Vitest + Testing Library をインストール
  ```bash
  npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
  ```
- [ ] `vitest.config.ts` を作成
- [ ] テストセットアップファイルを作成
- [ ] サンプルテストが実行できることを確認

### 1.4 MSW導入

- [ ] MSW をインストール
  ```bash
  npm install -D msw
  ```
- [ ] `src/mocks/handlers.ts` を作成
- [ ] `src/mocks/server.ts` を作成（テスト用）
- [ ] テストセットアップでMSWを設定

### 1.5 React Router導入

- [ ] React Router をインストール
  ```bash
  npm install react-router-dom
  ```
- [ ] `App.tsx` に基本ルーティングを設定
- [ ] ルーティングが動作することを確認

### 1.6 TanStack Query導入

- [ ] TanStack Query をインストール
  ```bash
  npm install @tanstack/react-query
  ```
- [ ] `QueryClient` と `QueryClientProvider` を設定
- [ ] キャッシュ設定（staleTime, gcTime）を追加

### 1.7 型定義・定数定義

- [ ] `src/types/weather.ts` を作成
  - [ ] `CityId` 型
  - [ ] `City` インターフェース
  - [ ] `WeatherApiResponse` インターフェース
  - [ ] `WeatherItem` インターフェース
  - [ ] `FormattedWeather` インターフェース
- [ ] `src/constants/cities.ts` を作成
  - [ ] `CITIES` 配列
  - [ ] `getCityById` 関数

### 1.8 環境変数設定

- [ ] `.env.local` を作成
- [ ] `VITE_OPENWEATHER_API_KEY` を設定
- [ ] `.gitignore` に `.env.local` が含まれていることを確認

---

## Phase 2: TDDで機能実装

### 2.1 ユーティリティ関数

#### utils/date.ts

- [ ] **Red**: `formatDateTime` のテストを作成
  - [ ] Unix timestampをJST形式（M/D HH:mm）に変換するテスト
  - [ ] テストが失敗することを確認
- [ ] **Green**: `formatDateTime` を実装
  - [ ] テストが成功することを確認
- [ ] **Refactor**: 必要に応じてリファクタリング

### 2.2 API層

#### api/weather.ts

- [ ] **Red**: `fetchWeather` のテストを作成（MSWでモック）
  - [ ] 正常系：天気データを取得できるテスト
  - [ ] 異常系：5xxエラー時にエラーがスローされるテスト
  - [ ] テストが失敗することを確認
- [ ] **Green**: `fetchWeather` を実装
  - [ ] APIエンドポイントへのfetch
  - [ ] レスポンスの整形（FormattedWeather型へ変換）
  - [ ] エラーハンドリング
  - [ ] テストが成功することを確認
- [ ] **Refactor**: 必要に応じてリファクタリング

### 2.3 カスタムフック

#### hooks/useWeather.ts

- [ ] **Red**: `useWeather` の正常系テストを作成
  - [ ] データ取得成功時にweatherDataを返すテスト
  - [ ] テストが失敗することを確認
- [ ] **Green**: `useWeather` の基本実装
  - [ ] useQueryを使用したデータ取得
  - [ ] テストが成功することを確認
- [ ] **Red**: `useWeather` のエラー系テストを作成
  - [ ] APIエラー時にisError=trueになるテスト
  - [ ] テストが失敗することを確認
- [ ] **Green**: エラーハンドリングを実装
  - [ ] テストが成功することを確認
- [ ] **Refactor**: 必要に応じてリファクタリング

### 2.4 コンポーネント

#### WeatherListItem.tsx

- [ ] **Red**: テストを作成
  - [ ] propsに応じた天気アイコン表示テスト
  - [ ] propsに応じた気温表示テスト
  - [ ] propsに応じた日時表示テスト
  - [ ] テストが失敗することを確認
- [ ] **Green**: コンポーネントを実装
  - [ ] テストが成功することを確認
- [ ] **Refactor**: スタイリングの調整

#### CityListItem.tsx

- [ ] **Red**: テストを作成
  - [ ] 地域名が表示されるテスト
  - [ ] クリックで正しいURLに遷移するテスト
  - [ ] テストが失敗することを確認
- [ ] **Green**: コンポーネントを実装
  - [ ] テストが成功することを確認
- [ ] **Refactor**: スタイリングの調整

#### ErrorScreen.tsx

- [ ] **Red**: テストを作成
  - [ ] エラーメッセージが表示されるテスト
  - [ ] ホームへ戻るリンクが表示されるテスト
  - [ ] テストが失敗することを確認
- [ ] **Green**: コンポーネントを実装
  - [ ] テストが成功することを確認
- [ ] **Refactor**: スタイリングの調整

#### WeatherSkeleton.tsx

- [ ] スケルトンコンポーネントを実装
- [ ] スタイリングの調整

#### CityList.tsx

- [ ] コンポーネントを実装
- [ ] CITIES定数を使用してCityListItemをマップ

#### WeatherList.tsx

- [ ] コンポーネントを実装
- [ ] propsのdataを使用してWeatherListItemをマップ

### 2.5 ページ統合

#### HomePage.tsx

- [ ] ページコンポーネントを実装
  - [ ] ヘッダー（タイトル）
  - [ ] CityListコンポーネントの組み込み
- [ ] スタイリングの調整
- [ ] 動作確認

#### WeatherPage.tsx

- [ ] ページコンポーネントを実装
  - [ ] useParamsでcityIdを取得
  - [ ] useWeatherでデータ取得
  - [ ] ローディング状態：WeatherSkeleton表示
  - [ ] エラー状態：ErrorScreen表示
  - [ ] 成功状態：WeatherList表示
  - [ ] 戻るナビゲーション
- [ ] スタイリングの調整
- [ ] 動作確認

### 2.6 結合テスト

- [ ] ホーム画面 → 天気画面への遷移テスト
- [ ] 天気画面 → ホーム画面への遷移テスト
- [ ] キャッシュ動作の確認

---

## Phase 3: UX改善・動作確認

### 3.1 UX改善

- [ ] ローディングスケルトンのアニメーション追加
- [ ] リストアイテムのホバー/アクティブ状態のスタイル調整
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

- [ ] 4地域が縦並びリストで表示される
- [ ] 各地域をクリックすると `/weather/:cityId` へ遷移する
- [ ] タップ/クリック時に視覚的フィードバックがある

### 天気画面

- [ ] 画面表示時にOpenWeatherMap APIを呼び出す
- [ ] 各予報アイテムに天気アイコン、気温(℃)、日時が表示される
- [ ] 日時は日本のタイムゾーン（JST）で表示される
- [ ] ホーム画面へ戻るナビゲーションがある

### エラー画面

- [ ] 5xx エラー時にエラー画面が表示される
- [ ] ホーム画面へ戻るリンクがある

### キャッシュ機能

- [ ] 一度取得した地域のデータはキャッシュから表示される
- [ ] DevToolsのNetworkタブで再リクエストが発生しないことを確認できる

---

## 進捗管理

| Phase | ステータス | 完了タスク | 全タスク |
|-------|-----------|-----------|---------|
| Phase 1 | 未着手 | 0 | 8 |
| Phase 2 | 未着手 | 0 | 6 |
| Phase 3 | 未着手 | 0 | 5 |
| **合計** | - | 0 | 19 |

---

## 注意事項

1. **TDDサイクルを守る**: 必ず「テストを書く → 実装 → リファクタリング」の順序で進める
2. **小さなステップで進む**: 一度に大きな変更をしない
3. **頻繁にコミット**: 各タスク完了ごとにコミットする
4. **リファクタリングは慎重に**: 過度な抽象化を避ける
5. **APIキーの管理**: `.env.local` に保存し、絶対にコミットしない
