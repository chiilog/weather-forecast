# 天気予報アプリ PRD

## 概要

OpenWeatherMap APIを使用した天気予報アプリ。4つの地域（東京、兵庫、大分、北海道）の5日間天気予報を表示する。

---

## 技術スタック

| 領域 | 採用技術 | 選定理由 |
|------|----------|----------|
| ビルド | Vite | 高速、設定シンプル |
| UI | React 18 + TypeScript | 要件指定 |
| データ取得 | TanStack Query v5 | キャッシュ要件との相性、宣言的な状態管理 |
| ルーティング | React Router v6 | SPA標準、軽量 |
| スタイリング | Tailwind CSS v3 | 開発速度、経験あり |
| テスト | Vitest + Testing Library | Viteとの統合、React標準 |
| APIモック | MSW (Mock Service Worker) | TDDでのAPI層テストに必要 |

---

## 機能要件

### 1. ホーム画面 (`/`)

| 項目 | 内容 |
|------|------|
| 表示 | 4地域のリスト（東京、兵庫、大分、北海道） |
| 操作 | リストアイテムをクリックで天気画面へ遷移 |
| URL | `/` |

**受け入れ条件**
- [ ] 4地域が縦並びリストで表示される
- [ ] 各地域をクリックすると `/weather/:cityId` へ遷移する
- [ ] タップ/クリック時に視覚的フィードバックがある

### 2. 天気画面 (`/weather/:cityId`)

| 項目 | 内容 |
|------|------|
| 表示 | 選択地域の5日間天気予報リスト |
| データ | 天気アイコン、気温、日時 |
| URL | `/weather/tokyo`, `/weather/hyogo`, `/weather/oita`, `/weather/hokkaido` |

**受け入れ条件**
- [ ] 画面表示時にOpenWeatherMap APIを呼び出す
- [ ] 各予報アイテムに天気アイコン、気温(℃)、日時が表示される
- [ ] 日時は日本のタイムゾーン（JST）で表示される
- [ ] ホーム画面へ戻るナビゲーションがある

### 3. エラー画面

| 項目 | 内容 |
|------|------|
| 表示条件 | API通信が5xx系エラーで失敗した場合 |
| 内容 | エラーメッセージ、ホームへ戻るリンク |

**受け入れ条件**
- [ ] 5xx エラー時にエラー画面が表示される
- [ ] ホーム画面へ戻るリンクがある
- [ ] 4xx エラーの扱いは任意（エラー画面 or 別の表示）

### 4. キャッシュ機能（応用要件）

| 項目 | 内容 |
|------|------|
| 対象 | 4地域の天気データ |
| 動作 | 同一地域への再アクセス時はAPIを呼ばずキャッシュを返す |
| 実装 | TanStack Query の staleTime 設定 |

**受け入れ条件**
- [ ] 一度取得した地域のデータはキャッシュから表示される
- [ ] DevToolsのNetworkタブで再リクエストが発生しないことを確認できる

---

## API仕様

### エンドポイント

```
GET https://api.openweathermap.org/data/2.5/forecast
```

### リクエストパラメータ

| パラメータ | 値 |
|------------|-----|
| q | Tokyo / Hyogo / Oita / Hokkaido |
| units | metric（固定） |
| lang | ja（固定） |
| APPID | 発行したAPIキー |

### 使用するレスポンスフィールド

```typescript
{
  list: [
    {
      dt: number;           // Unix timestamp
      main: {
        temp: number;       // 気温（℃）
      };
      weather: [
        {
          icon: string;     // アイコンコード（例: "01d"）
        }
      ];
    }
  ]
}
```

### アイコンURL

```
https://openweathermap.org/img/wn/{icon}@2x.png
```

---

## 画面設計

### ホーム画面

```
┌─────────────────────────────┐
│  天気予報アプリ              │
├─────────────────────────────┤
│  ┌─────────────────────┐   │
│  │ 🗾 東京              → │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🗾 兵庫              → │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🗾 大分              → │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🗾 北海道            → │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
```

### 天気画面

```
┌─────────────────────────────┐
│  ← 戻る    東京の天気        │
├─────────────────────────────┤
│  ┌─────────────────────┐   │
│  │ ☀️  25°C             │   │
│  │ 1/20 12:00          │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ ⛅  22°C             │   │
│  │ 1/20 15:00          │   │
│  └─────────────────────┘   │
│  ...                        │
└─────────────────────────────┘
```

### ローディング状態

```
┌─────────────────────────────┐
│  ← 戻る    東京の天気        │
├─────────────────────────────┤
│  ┌─────────────────────┐   │
│  │ ████████  ████      │   │  ← スケルトン
│  │ ████████            │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ ████████  ████      │   │
│  │ ████████            │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
```

### エラー画面

```
┌─────────────────────────────┐
│                             │
│    ⚠️ エラーが発生しました    │
│                             │
│    天気情報を取得できません    │
│    でした。                  │
│                             │
│    [ ホームに戻る ]          │
│                             │
└─────────────────────────────┘
```

---

## ディレクトリ構成

```
src/
├── main.tsx                      # エントリポイント
├── App.tsx                       # ルーティング設定
├── pages/
│   ├── HomePage.tsx              # ホーム画面
│   └── WeatherPage.tsx           # 天気画面
├── components/
│   ├── CityList.tsx              # 地域リスト
│   ├── CityListItem.tsx          # 地域リストアイテム
│   ├── CityListItem.test.tsx     # テスト（コロケーション）
│   ├── WeatherList.tsx           # 天気リスト
│   ├── WeatherListItem.tsx       # 天気リストアイテム
│   ├── WeatherListItem.test.tsx  # テスト（コロケーション）
│   ├── WeatherSkeleton.tsx       # ローディングスケルトン
│   └── ErrorScreen.tsx           # エラー画面
├── hooks/
│   ├── useWeather.ts             # 天気データ取得フック
│   └── useWeather.test.tsx       # テスト（コロケーション）
├── api/
│   └── weather.ts                # API呼び出し関数
├── types/
│   └── weather.ts                # 型定義
├── utils/
│   ├── date.ts                   # 日時フォーマット関数
│   └── date.test.ts              # テスト（コロケーション）
└── constants/
    └── cities.ts                 # 地域定義
```

---

## 型定義

```typescript
// types/weather.ts

// 地域
export type CityId = 'tokyo' | 'hyogo' | 'oita' | 'hokkaido';

export interface City {
  id: CityId;
  nameJa: string;      // 東京
  nameEn: string;      // Tokyo（API用）
}

// APIレスポンス（必要な部分のみ）
export interface WeatherApiResponse {
  list: WeatherItem[];
}

export interface WeatherItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
}

// 整形後のデータ
export interface FormattedWeather {
  dateTime: string;    // "1/20 12:00"
  temp: number;        // 25
  iconUrl: string;     // "https://openweathermap.org/img/wn/01d@2x.png"
}
```

---

## 開発フェーズ

### Phase 1: 基盤構築

- [x] PRD作成
- [ ] プロジェクトセットアップ（Vite + React + TypeScript）
- [ ] Tailwind CSS導入
- [ ] Vitest + Testing Library導入 ← **最初から入れる**
- [ ] React Router導入・基本ルーティング
- [ ] TanStack Query導入
- [ ] 型定義作成（types/weather.ts）
- [ ] 定数定義（constants/cities.ts）

### Phase 2: TDDで機能実装

各機能ごとに **Red → Green** で進める。Refactorは必要に応じて一緒にやる。

**ユーティリティ & API層**

| 対象 | Red | Green | Refactor |
|------|-----|-------|----------|
| utils/date.ts | formatDateTimeのテスト作成 | 実装して通す | 一緒にやる |
| api/weather.ts | fetchWeatherのテスト作成（MSWでモック） | 実装して通す | 一緒にやる |

**カスタムフック**

| 対象 | Red | Green | Refactor |
|------|-----|-------|----------|
| hooks/useWeather.ts | 正常系テスト作成 | 実装して通す | - |
| hooks/useWeather.ts | エラー系テスト作成 | 実装して通す | 一緒にやる |

**コンポーネント**

| 対象 | Red | Green | Refactor |
|------|-----|-------|----------|
| WeatherListItem | propsに応じた表示テスト | 実装して通す | 一緒にやる |
| CityListItem | クリックで遷移するテスト | 実装して通す | 一緒にやる |
| ErrorScreen | エラーメッセージ表示テスト | 実装して通す | 一緒にやる |

**ページ統合**

| 対象 | 内容 |
|------|------|
| HomePage | CityListを組み込み、動作確認 |
| WeatherPage | WeatherList, ErrorScreen, Skeletonを組み込み |
| 結合テスト | 画面遷移の動作確認 |

### Phase 3: UX改善・動作確認

- [ ] ローディングスケルトン実装
- [ ] 画面遷移のアニメーション（余裕があれば）
- [ ] レスポンシブ対応確認
- [ ] 最終動作確認
- [ ] コード整理
- [ ] README作成

---

## TDDの進め方

### 基本サイクル

```
Red      → テストを書く（失敗する）
Green    → 最小限の実装で通す（動作する状態で一旦完了）
-------- ここで一旦完了 --------
Refactor → 一緒にやる（必要な場合のみ）
```

**注意：** Greenまでを実装フェーズとし、Refactorは別途判断する。AIに任せると過度な抽象化が起きやすいため、リファクタリングは一緒に進める。

### 例：utils/date.ts

**Step 1: Red**
```typescript
// utils/date.test.ts
import { describe, it, expect } from 'vitest';
import { formatDateTime } from './date';

describe('formatDateTime', () => {
  it('Unix timestampを日本時間でフォーマットする', () => {
    // 2024-01-20 12:00:00 UTC = 2024-01-20 21:00:00 JST
    const timestamp = 1705752000;
    expect(formatDateTime(timestamp)).toBe('1/20 21:00');
  });
});
```

```bash
npm test  # → 失敗（formatDateTimeが存在しない）
```

**Step 2: Green**
```typescript
// utils/date.ts
export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}
```

```bash
npm test  # → 成功
```

**Step 3: Refactor（必要な場合のみ、一緒にやる）**
- コードの可読性に問題があれば一緒に整理
- 過度な抽象化は避ける

### 例：hooks/useWeather.ts

**Step 1: Red**
```typescript
// hooks/useWeather.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { useWeather } from './useWeather';

// テスト用のラッパー
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useWeather', () => {
  it('データ取得成功時にweatherDataを返す', async () => {
    const { result } = renderHook(() => useWeather('tokyo'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data.length).toBeGreaterThan(0);
  });
});
```

**Step 2: Green** → 実装して通す（ここで一旦完了）

**Step 3: Refactor** → 必要があれば一緒にやる

---

## テスト方針

### TDDで書くテスト

| 対象 | テスト内容 |
|------|-----------|
| utils/date.ts | 日時フォーマットが正しいか |
| api/weather.ts | API呼び出しが正しく動作するか |
| hooks/useWeather.ts | データ取得、ローディング、エラー状態 |
| WeatherListItem | propsに応じた表示 |
| CityListItem | クリックイベント |
| ErrorScreen | エラーメッセージ表示 |

### APIモックについて

TDDでAPI層・フックをテストするために **MSW (Mock Service Worker)** を使用する。

```typescript
// テスト用のモックハンドラー
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.openweathermap.org/data/2.5/forecast', ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('q');
    
    return HttpResponse.json({
      list: [
        {
          dt: 1705752000,
          main: { temp: 15.5 },
          weather: [{ icon: '01d' }],
        },
      ],
    });
  }),
];
```

---

## 評価観点への対応

| 評価観点 | 対応 |
|----------|------|
| 要件を満たしているか | 全機能要件を実装 |
| 機能が正しく動作するか | テストで担保 |
| プログラム設計の品質 | 責務分離（hooks, api, components）、型安全 |
| ソースコードの品質 | TypeScript厳格モード、一貫した命名規則 |
| 挙動の品質 | スケルトン、エラーハンドリング、キャッシュ |

---

## リスクと対策

| リスク | 影響 | 対策 |
|--------|------|------|
| TanStack Query学習に時間がかかる | Phase 1遅延 | 公式ドキュメントのQuick Startに集中、最小限の機能から |
| React Router学習に時間がかかる | Phase 1遅延 | 今回必要なのは基本的な使い方のみ |
| APIキーの取得に時間がかかる | 開発開始遅延 | 先にセットアップを完了させ、モックデータで開発開始 |
| テストが想定より難しい | Phase 2遅延 | 最低限utils関数のテストは書き、フックテストは余裕があれば |

---

## 備考

### APIキーの管理

```bash
# .env.local（gitignore対象）
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

```typescript
// 使用時
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

### キャッシュ設定

```typescript
// TanStack Queryの設定
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10分間キャッシュを新鮮とみなす
      gcTime: 1000 * 60 * 30,    // 30分間キャッシュを保持
    },
  },
});
```

---

## 次のアクション

1. OpenWeatherMapでAPIキーを発行する
2. プロジェクトをセットアップする
3. 実装を開始する