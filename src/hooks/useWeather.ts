import { useQuery } from '@tanstack/react-query';
import type { CityId } from '../types/city';
import type { WeatherApiResponse } from '../types/weather';
import { CITIES } from '../constants/cities';
import { fetchWeather, buildOpenWeatherForecastUrl } from '../api/weather';

/**
 * 指定した都市の天気予報データを取得するカスタムフック
 * @param cityId 都市ID
 * @returns TanStack Queryの結果オブジェクト
 */
export const useWeather = (cityId: CityId) => {
  const city = CITIES.find((c) => c.id === cityId);

  return useQuery<WeatherApiResponse>({
    queryKey: ['weather', cityId],
    queryFn: async () => {
      if (!city) {
        throw new Error(`City not found: ${cityId}`);
      }
      const url = buildOpenWeatherForecastUrl(city.nameEn);
      return fetchWeather(url);
    },
    enabled: !!city,
  });
};
