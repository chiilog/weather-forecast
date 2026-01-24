import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { useWeather } from './useWeather';
import type { CityId } from '../types/city';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useWeather', () => {
  it('天気データを取得できる', async () => {
    const { result } = renderHook(() => useWeather('tokyo'), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.cod).toBe('200');
    expect(result.current.data?.list).toHaveLength(3);
  });

  it('無効なcityIdの場合、クエリが無効になる', async () => {
    const { result } = renderHook(
      () => useWeather('invalid' as unknown as CityId),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });
  });
});
