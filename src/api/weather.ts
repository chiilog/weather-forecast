import type { WeatherApiResponse } from '../types/weather';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY_ENV_VAR = 'VITE_OPENWEATHER_API_KEY';

/**
 * OpenWeatherMap Forecast APIのURLを構築する
 * @param cityName 都市名(英語)
 * @returns 完全なAPIエンドポイントURL
 */
export const buildOpenWeatherForecastUrl = (cityName: string): string => {
  const apiKey = import.meta.env[API_KEY_ENV_VAR];
  if (!apiKey) {
    throw new Error(`${API_KEY_ENV_VAR} is not set in .env file`);
  }
  const params = new URLSearchParams({
    q: cityName,
    appid: apiKey,
    units: 'metric',
    lang: 'ja',
  });
  return `${API_BASE_URL}/forecast?${params.toString()}`;
};

/**
 * API呼び出し時のエラーを表すクラス
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * 指定したURLから天気予報データを取得
 * @param url APIエンドポイントURL
 * @returns 天気予報データ
 * @throws {ApiError} API呼び出しに失敗した場合
 */
export const fetchWeather = async (
  url: string
): Promise<WeatherApiResponse> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      `Weather API request failed: ${response.status}`,
      response.status
    );
  }

  return await response.json();
};
