import { QueryClient } from '@tanstack/react-query';

// カスタムエラー型（api/weather.ts で定義予定）
interface ApiError extends Error {
  status: number;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10分間キャッシュを新鮮とみなす
      gcTime: 1000 * 60 * 30, // 30分間キャッシュを保持
      refetchOnWindowFocus: false, // ウィンドウフォーカス時の自動再取得を無効化
      retry: (failureCount, error) => {
        // 4xx系エラーはリトライしない（クライアントエラーは再試行しても解決しない）
        if (
          error &&
          typeof error === 'object' &&
          'status' in error &&
          typeof (error as ApiError).status === 'number'
        ) {
          const status = (error as ApiError).status;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        // それ以外のエラー（5xx、ネットワークエラー等）は1回までリトライ（計2回試行）
        return failureCount < 1;
      },
    },
  },
});
