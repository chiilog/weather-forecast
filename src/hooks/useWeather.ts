import { useQuery } from '@tanstack/react-query';
import type { WeatherApiResponse } from '../types/weather';
import { CITIES } from '../constants/cities';
import { fetchWeather, buildOpenWeatherForecastUrl } from '../api/weather';

/**
 * 指定した都市の天気予報データを取得するカスタムフック
 * @param cityId 都市ID
 * @returns TanStack Queryの結果オブジェクト
 */
export const useWeather = (cityId: string | undefined) => {
  const city = cityId ? CITIES.find((c) => c.id === cityId) : undefined;

  return useQuery<WeatherApiResponse>({
    queryKey: ['weather', cityId],
    queryFn: async () => {
      if (!city) {
        throw new Error(`City not found: ${cityId ?? 'undefined'}`);
      }
      const url = buildOpenWeatherForecastUrl(city.nameEn);
      return fetchWeather(url);
    },
    enabled: !!city,
  });
};
