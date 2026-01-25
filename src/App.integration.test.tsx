import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import App from './App';
import { server } from './mocks/server';
import { mockWeatherResponse } from './mocks/handlers';

let requestCount = 0;

const trackingHandler = http.get(
  'https://api.openweathermap.org/data/2.5/forecast',
  () => {
    requestCount++;
    return HttpResponse.json(mockWeatherResponse);
  }
);

const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // テスト高速化のため
        staleTime: 1000 * 60 * 10, // 本番と同じ設定
        gcTime: 1000 * 60 * 30, // 本番と同じ設定
        refetchOnWindowFocus: false, // 本番と同じ設定
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('App - 結合テスト', () => {
  beforeEach(() => {
    requestCount = 0;
    server.use(trackingHandler);
  });

  describe('Header表示', () => {
    it('ホーム画面でHeaderが表示される', () => {
      renderApp();

      // ヘッダータイトルが表示される
      expect(
        screen.getByRole('heading', { level: 1, name: '天気予報アプリ' })
      ).toBeInTheDocument();

      // 戻るボタンは表示されない
      expect(screen.queryByLabelText('戻る')).not.toBeInTheDocument();
    });

    it('天気画面でHeaderが表示される', async () => {
      renderApp();

      // 1. 東京をクリックして天気画面へ遷移
      const tokyoLink = screen.getByRole('link', { name: '東京' });
      await userEvent.click(tokyoLink);

      // 2. ヘッダータイトルが表示される
      expect(
        await screen.findByRole('heading', { level: 1, name: '東京の天気' })
      ).toBeInTheDocument();

      // 3. 戻るボタンが表示される
      expect(screen.getByLabelText('戻る')).toBeInTheDocument();
    });
  });

  describe('画面遷移', () => {
    it('ホーム画面 → 天気画面へ遷移できる', async () => {
      renderApp();

      // 1. ホーム画面が表示されていることを確認
      expect(screen.getByText('天気予報アプリ')).toBeInTheDocument();

      // 2. 「東京」リンクをクリック
      const tokyoLink = screen.getByRole('link', { name: '東京' });
      await userEvent.click(tokyoLink);

      // 3. 天気画面に遷移し、天気データが表示されることを確認
      expect(await screen.findByText('東京の天気')).toBeInTheDocument();
      expect(
        await screen.findByText('2024-01-20 12:00:00')
      ).toBeInTheDocument();
    });

    it('天気画面 → ホーム画面へ遷移できる', async () => {
      renderApp();

      // 1. ホーム → 天気画面へ遷移
      const tokyoLink = screen.getByRole('link', { name: '東京' });
      await userEvent.click(tokyoLink);
      expect(await screen.findByText('東京の天気')).toBeInTheDocument();

      // 2. 「戻る」リンクをクリック
      const backLink = screen.getByRole('link', { name: '戻る' });
      await userEvent.click(backLink);

      // 3. ホーム画面に戻ることを確認
      expect(await screen.findByText('天気予報アプリ')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '東京' })).toBeInTheDocument();
    });
  });

  describe('キャッシュ動作', () => {
    it('同じ地域に再訪問時にAPIリクエストが発生しない', async () => {
      renderApp();

      // 1. 東京をクリック（1回目）
      const tokyoLink = screen.getByRole('link', { name: '東京' });
      await userEvent.click(tokyoLink);
      expect(await screen.findByText('東京の天気')).toBeInTheDocument();

      // 2. requestCountが1であることを確認
      expect(requestCount).toBe(1);

      // 3. ホームに戻る
      const backLink = screen.getByRole('link', { name: '戻る' });
      await userEvent.click(backLink);
      expect(await screen.findByText('天気予報アプリ')).toBeInTheDocument();

      // 4. 再度東京をクリック（2回目）
      const tokyoLinkAgain = screen.getByRole('link', { name: '東京' });
      await userEvent.click(tokyoLinkAgain);
      expect(await screen.findByText('東京の天気')).toBeInTheDocument();

      // 5. requestCountが1のまま（APIリクエストが発生していない）ことを確認
      expect(requestCount).toBe(1);
    });
  });
});
