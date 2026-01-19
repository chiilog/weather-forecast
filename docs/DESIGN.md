# 天気予報アプリ 設計書

## 1. システムアーキテクチャ

### 1.1 全体構成

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React Application                       │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                   React Router                       │  │  │
│  │  │            (ルーティング・ナビゲーション)              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                          │                                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                    Pages                             │  │  │
│  │  │     HomePage.tsx       │      WeatherPage.tsx        │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                          │                                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                  Components                          │  │  │
│  │  │  CityList │ WeatherList │ ErrorScreen │ Skeleton    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                          │                                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                Custom Hooks                          │  │  │
│  │  │                  useWeather                          │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                          │                                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              TanStack Query                          │  │  │
│  │  │        (データフェッチ・キャッシュ管理)               │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                          │                                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                  API Layer                           │  │  │
│  │  │               api/weather.ts                         │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OpenWeatherMap API                            │
│         https://api.openweathermap.org/data/2.5/forecast         │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 技術スタック

| レイヤー | 技術 | バージョン |
|----------|------|-----------|
| ビルドツール | Vite | 5.x |
| UIフレームワーク | React | 18.x |
| 言語 | TypeScript | 5.x |
| 状態管理・データフェッチ | TanStack Query | 5.x |
| ルーティング | React Router | 6.x |
| スタイリング | Tailwind CSS | 3.x |
| テスト | Vitest + Testing Library | - |
| APIモック | MSW | 2.x |

---

## 2. ディレクトリ構成

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
│   ├── CityListItem.test.tsx     # テスト
│   ├── WeatherList.tsx           # 天気リスト
│   ├── WeatherListItem.tsx       # 天気リストアイテム
│   ├── WeatherListItem.test.tsx  # テスト
│   ├── WeatherSkeleton.tsx       # ローディングスケルトン
│   └── ErrorScreen.tsx           # エラー画面
├── hooks/
│   ├── useWeather.ts             # 天気データ取得フック
│   └── useWeather.test.tsx       # テスト
├── api/
│   └── weather.ts                # API呼び出し関数
├── types/
│   └── weather.ts                # 型定義
├── utils/
│   ├── date.ts                   # 日時フォーマット関数
│   └── date.test.ts              # テスト
└── constants/
    └── cities.ts                 # 地域定義
```

---

## 3. コンポーネント設計

### 3.1 コンポーネント階層

```
App
├── HomePage
│   └── CityList
│       └── CityListItem (×4)
│
└── WeatherPage
    ├── WeatherList
    │   └── WeatherListItem (×n)
    ├── WeatherSkeleton (ローディング時)
    └── ErrorScreen (エラー時)
```

### 3.2 コンポーネント詳細

#### App.tsx

**責務**: ルーティング設定、QueryClientProvider提供

```typescript
// 構造
<QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather/:cityId" element={<WeatherPage />} />
    </Routes>
  </BrowserRouter>
</QueryClientProvider>
```

#### HomePage.tsx

**責務**: ホーム画面のレイアウト

| Props | 型 | 説明 |
|-------|-----|------|
| なし | - | - |

```typescript
// 構造
<div>
  <header>天気予報アプリ</header>
  <CityList />
</div>
```

#### WeatherPage.tsx

**責務**: 天気画面のレイアウト、状態に応じた表示切り替え

| Props | 型 | 説明 |
|-------|-----|------|
| なし（useParamsでcityIdを取得） | - | - |

```typescript
// 状態に応じた表示
if (isLoading) return <WeatherSkeleton />;
if (isError) return <ErrorScreen />;
return <WeatherList data={data} />;
```

#### CityList.tsx

**責務**: 地域リストのコンテナ

| Props | 型 | 説明 |
|-------|-----|------|
| なし（constantsから地域データを取得） | - | - |

```typescript
// 構造
<ul>
  {cities.map(city => (
    <CityListItem key={city.id} city={city} />
  ))}
</ul>
```

#### CityListItem.tsx

**責務**: 個別の地域アイテム表示、クリックで遷移

| Props | 型 | 説明 |
|-------|-----|------|
| city | City | 地域データ |

```typescript
// 構造
<li>
  <Link to={`/weather/${city.id}`}>
    {city.nameJa}
  </Link>
</li>
```

#### WeatherList.tsx

**責務**: 天気予報リストのコンテナ

| Props | 型 | 説明 |
|-------|-----|------|
| data | FormattedWeather[] | 整形済み天気データ |

```typescript
// 構造
<ul>
  {data.map((item, index) => (
    <WeatherListItem key={`${item.dt}-${index}`} weather={item} />
  ))}
</ul>
```

#### WeatherListItem.tsx

**責務**: 個別の天気予報アイテム表示

| Props | 型 | 説明 |
|-------|-----|------|
| weather | FormattedWeather | 天気データ |

```typescript
// 構造
<li>
  <img src={weather.iconUrl} alt="天気アイコン" />
  <span>{weather.temp}°C</span>
  <span>{weather.dateTime}</span>
</li>
```

#### WeatherSkeleton.tsx

**責務**: ローディング中のスケルトン表示

| Props | 型 | 説明 |
|-------|-----|------|
| count | number (optional) | スケルトンアイテム数（デフォルト: 5） |

#### ErrorScreen.tsx

**責務**: エラー画面表示

| Props | 型 | 説明 |
|-------|-----|------|
| なし | - | - |

```typescript
// 構造
<div>
  <p>エラーが発生しました</p>
  <p>天気情報を取得できませんでした。</p>
  <Link to="/">ホームに戻る</Link>
</div>
```

---

## 4. 型定義

### 4.1 types/weather.ts

```typescript
// 地域ID
export type CityId = 'tokyo' | 'hyogo' | 'oita' | 'hokkaido';

// 地域データ
export interface City {
  id: CityId;
  nameJa: string;      // 日本語名（表示用）
  nameEn: string;      // 英語名（API用）
}

// APIレスポンス（必要なフィールドのみ）
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

// 整形後のデータ（UI表示用）
export interface FormattedWeather {
  dt: number;          // Unix timestamp（key用）
  dateTime: string;    // "1/20 12:00"
  temp: number;        // 25
  iconUrl: string;     // "https://openweathermap.org/img/wn/01d@2x.png"
}
```

### 4.2 constants/cities.ts

```typescript
import { City } from '../types/weather';

export const CITIES: City[] = [
  { id: 'tokyo', nameJa: '東京', nameEn: 'Tokyo' },
  { id: 'hyogo', nameJa: '兵庫', nameEn: 'Hyogo' },
  { id: 'oita', nameJa: '大分', nameEn: 'Oita' },
  { id: 'hokkaido', nameJa: '北海道', nameEn: 'Hokkaido' },
];

export const getCityById = (id: string): City | undefined => {
  return CITIES.find(city => city.id === id);
};
```

---

## 5. API設計

### 5.1 エンドポイント

```
GET https://api.openweathermap.org/data/2.5/forecast
```

### 5.2 リクエストパラメータ

| パラメータ | 値 | 説明 |
|------------|-----|------|
| q | Tokyo / Hyogo / Oita / Hokkaido | 地域名（英語） |
| units | metric | 単位（摂氏） |
| lang | ja | 言語 |
| APPID | {API_KEY} | APIキー |

### 5.3 api/weather.ts

```typescript
import { WeatherApiResponse, FormattedWeather } from '../types/weather';
import { formatDateTime } from '../utils/date';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchWeather(cityNameEn: string): Promise<FormattedWeather[]> {
  const url = `${API_BASE_URL}/forecast?q=${cityNameEn}&units=metric&lang=ja&APPID=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data: WeatherApiResponse = await response.json();

  return data.list.map(item => ({
    dt: item.dt,
    dateTime: formatDateTime(item.dt),
    temp: Math.round(item.main.temp),
    iconUrl: item.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` : '',
  }));
}
```

---

## 6. カスタムフック設計

### 6.1 hooks/useWeather.ts

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weather';
import { getCityById } from '../constants/cities';
import { FormattedWeather } from '../types/weather';

export function useWeather(cityId: string) {
  const city = getCityById(cityId);

  return useQuery<FormattedWeather[], Error>({
    queryKey: ['weather', cityId],
    queryFn: () => fetchWeather(city!.nameEn),
    enabled: !!city,
  });
}
```

---

## 7. データフロー

### 7.1 正常系フロー

```
User Action          Component           Hook              API
    │                    │                 │                │
    │  クリック           │                 │                │
    ├───────────────────>│                 │                │
    │                    │  useWeather()   │                │
    │                    ├────────────────>│                │
    │                    │                 │  fetchWeather()│
    │                    │                 ├───────────────>│
    │                    │                 │                │
    │                    │                 │   Response     │
    │                    │                 │<───────────────┤
    │                    │   data          │                │
    │                    │<────────────────┤                │
    │   表示更新          │                 │                │
    │<───────────────────┤                 │                │
```

### 7.2 キャッシュフロー

```
User Action          Component           TanStack Query    API
    │                    │                     │            │
    │  再アクセス         │                     │            │
    ├───────────────────>│                     │            │
    │                    │  useWeather()       │            │
    │                    ├────────────────────>│            │
    │                    │                     │            │
    │                    │  キャッシュから返却   │            │
    │                    │<────────────────────┤            │
    │   即座に表示         │                     │            │
    │<───────────────────┤                     │            │
    │                    │                     │            │
    │              (APIリクエストなし)           │            │
```

### 7.3 エラーフロー

```
User Action          Component           Hook              API
    │                    │                 │                │
    │  アクセス           │                 │                │
    ├───────────────────>│                 │                │
    │                    │  useWeather()   │                │
    │                    ├────────────────>│                │
    │                    │                 │  fetchWeather()│
    │                    │                 ├───────────────>│
    │                    │                 │                │
    │                    │                 │  5xx Error     │
    │                    │                 │<───────────────┤
    │                    │   isError=true  │                │
    │                    │<────────────────┤                │
    │   ErrorScreen表示   │                 │                │
    │<───────────────────┤                 │                │
```

---

## 8. 状態管理

### 8.1 TanStack Query設定

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,  // 10分間キャッシュを新鮮とみなす
      gcTime: 1000 * 60 * 30,     // 30分間キャッシュを保持
      retry: 1,                   // リトライ1回
    },
  },
});
```

### 8.2 状態の種類

| 状態 | 説明 | UI表示 |
|------|------|--------|
| isLoading | 初回データ取得中 | WeatherSkeleton |
| isSuccess | データ取得成功 | WeatherList |
| isError | データ取得失敗 | ErrorScreen |

---

## 9. ルーティング設計

### 9.1 ルート定義

| パス | コンポーネント | 説明 |
|------|---------------|------|
| / | HomePage | ホーム画面 |
| /weather/:cityId | WeatherPage | 天気画面 |

### 9.2 パラメータ

| パラメータ | 型 | 有効値 |
|------------|-----|--------|
| cityId | string | tokyo, hyogo, oita, hokkaido |

---

## 10. スタイリング設計

### 10.1 Tailwind CSS使用方針

- ユーティリティファーストで実装
- カスタムカラーは最小限に
- レスポンシブはモバイルファースト

### 10.2 共通スタイル

```typescript
// 例：リストアイテムの共通スタイル
const listItemStyle = "p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors";

// 例：ボタンスタイル
const buttonStyle = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600";
```

---

## 11. テスト設計

### 11.1 テスト対象と方針

| 対象 | テストツール | テスト内容 |
|------|-------------|-----------|
| utils/date.ts | Vitest | 日時フォーマットの正確性 |
| api/weather.ts | Vitest + MSW | API呼び出しの正確性 |
| hooks/useWeather.ts | Testing Library | データ取得・状態管理 |
| CityListItem | Testing Library | クリックイベント・遷移 |
| WeatherListItem | Testing Library | propsに応じた表示 |
| ErrorScreen | Testing Library | エラーメッセージ表示 |

### 11.2 MSWモックハンドラー

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.openweathermap.org/data/2.5/forecast', ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('q');

    // 正常レスポンス
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

// エラーレスポンス用
export const errorHandlers = [
  http.get('https://api.openweathermap.org/data/2.5/forecast', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];
```

---

## 12. セキュリティ設計

### 12.1 APIキー管理

- `.env.local`に保存（gitignore対象）
- `VITE_`プレフィックスでクライアント側で使用
- 本番環境では環境変数として設定

```bash
# .env.local
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 12.2 注意事項

- APIキーはクライアント側で使用されるため、完全な秘匿は不可
- 使用量制限やドメイン制限をOpenWeatherMapの管理画面で設定推奨

---

## 13. パフォーマンス設計

### 13.1 最適化ポイント

| 項目 | 対策 |
|------|------|
| API呼び出し削減 | TanStack Queryのキャッシュ活用 |
| 初期表示改善 | スケルトンローディング |
| バンドルサイズ | Viteのツリーシェイキング |
| 画像最適化 | 2xアイコンの使用（高解像度対応） |

### 13.2 キャッシュ戦略

- staleTime: 10分（10分間は再フェッチしない）
- gcTime: 30分（30分後にキャッシュ削除）
- 同一地域への再アクセス時はキャッシュから即座に表示
