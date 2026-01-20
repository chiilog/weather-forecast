# テスト戦略

このプロジェクトのテスト戦略とツール設定について説明します。

## テスト環境

### Vitest
- **環境**: jsdom（ブラウザ環境をシミュレート）
- **設定ファイル**: `vitest.config.ts`
- **セットアップファイル**: `vitest.setup.ts`（MSWサーバーを自動セットアップ）
- **グローバルテスト関数**: describe, it, expect等を使用可能

### @testing-library/react
- Reactコンポーネントのテストに使用
- ユーザーの視点でUIをテスト
- アクセシビリティを重視

### MSW (Mock Service Worker)
- APIモッキングに使用
- 本番コードに影響を与えない

## MSW設定

### ハンドラー定義（mocks/handlers.ts）
- **モック対象**: OpenWeatherMap API
- **エンドポイント**: `https://api.openweathermap.org/data/2.5/forecast`
- **レスポンス形式**: WeatherApiResponse型
- **エラーハンドラー**: 500, 404, 401, 429

### サーバー設定（mocks/server.ts）
- `vitest.setup.ts`で自動的にMSWサーバーをセットアップ
- テスト前後で自動的にハンドラーをリセット

## テスト実行コマンド

- `npm test` - watch mode（開発中に使用）
- `npm run test:run` - 一度だけ実行（CIで使用）
- `npm run test:coverage` - カバレッジレポート生成

## テストの書き方

### ユニットテスト（ユーティリティ関数）

```typescript
import { describe, it, expect } from 'vitest';
import { getCityById } from './cities';

describe('getCityById', () => {
  it('有効なIDで地域を返す', () => {
    const city = getCityById('tokyo');
    expect(city?.nameJa).toBe('東京');
  });

  it('無効なIDでundefinedを返す', () => {
    const city = getCityById('invalid');
    expect(city).toBeUndefined();
  });
});
```

### コンポーネントテスト

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('ホームページが表示される', () => {
    render(<HomePage />);
    expect(screen.getByText('ホームページ')).toBeInTheDocument();
  });
});
```

### APIモックを使用したテスト

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { WeatherPage } from './pages/WeatherPage';

describe('WeatherPage', () => {
  it('天気データを取得して表示する', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WeatherPage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/気温/)).toBeInTheDocument();
    });
  });
});
```

## テスト方針

1. **ユニットテスト優先**: まずユーティリティ関数のテストから
2. **コンポーネントテスト**: UIの動作確認
3. **統合テスト**: MSWを使用してAPI連携を含むテスト
4. **カバレッジ**: 80%以上を目標（過度な目標設定は避ける）
