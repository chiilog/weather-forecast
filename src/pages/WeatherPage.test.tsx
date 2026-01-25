import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { WeatherPage } from './WeatherPage';
import { server } from '../mocks/server';
import { errorHandlers } from '../mocks/handlers';

const renderWeatherPage = (cityId: string) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/weather/${cityId}`]}>
        <Routes>
          <Route path="/weather/:cityId" element={<WeatherPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('WeatherPage', () => {
  it('ローディング中は「読み込み中...」を表示する', async () => {
    renderWeatherPage('tokyo');
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('データ取得成功時は天気リストを表示する', async () => {
    renderWeatherPage('tokyo');
    // MSWでモックされたデータが返される
    expect(await screen.findByText('2024-01-20 12:00:00')).toBeInTheDocument();
  });

  it('都市名が正しく表示される', async () => {
    renderWeatherPage('tokyo');
    expect(await screen.findByText('東京の天気')).toBeInTheDocument();
  });

  it('401エラー時はAPIキーが無効である旨のメッセージを表示する', async () => {
    server.use(errorHandlers.unauthorized);
    renderWeatherPage('tokyo');
    expect(
      await screen.findByText('APIキーが無効です。設定を確認してください。')
    ).toBeInTheDocument();
  });

  it('404エラー時は都市が見つからない旨のメッセージを表示する', async () => {
    server.use(errorHandlers.notFound);
    renderWeatherPage('tokyo');
    expect(
      await screen.findByText('指定された都市の天気情報が見つかりません。')
    ).toBeInTheDocument();
  });

  it('429エラー時はレート制限超過の旨のメッセージを表示する', async () => {
    server.use(errorHandlers.rateLimited);
    renderWeatherPage('tokyo');
    expect(
      await screen.findByText(
        'APIのリクエスト制限を超過しました。しばらく待ってから再度お試しください。'
      )
    ).toBeInTheDocument();
  });

  it('500エラー時はサーバーエラーの旨のメッセージを表示する', async () => {
    server.use(errorHandlers.serverError);
    renderWeatherPage('tokyo');
    expect(
      await screen.findByText(
        'サーバーでエラーが発生しました。時間をおいて再度お試しください。'
      )
    ).toBeInTheDocument();
  });

  it('無効なcityIDで「都市が見つかりません」を表示する', () => {
    renderWeatherPage('invalid');
    expect(screen.getByText('都市が見つかりません')).toBeInTheDocument();
  });
});
