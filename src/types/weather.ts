/**
 * 地域ID型
 */
export type CityId = 'tokyo' | 'hyogo' | 'oita' | 'hokkaido';

/**
 * 地域データ
 */
export interface City {
  id: CityId;
  nameJa: string; // 日本語名（表示用）
  nameEn: string; // 英語名（API用）
}

/**
 * OpenWeatherMap APIレスポンス（必要なフィールドのみ）
 */
export interface WeatherApiResponse {
  list: WeatherItem[];
}

/**
 * APIレスポンスの各天気アイテム
 */
export interface WeatherItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
}

/**
 * 整形後の天気データ（UI表示用）
 */
export interface FormattedWeather {
  dt: number; // Unix timestamp（key用）
  dateTime: string; // "1/20 12:00" 形式
  temp: number; // 整数の気温
  iconUrl: string; // "https://openweathermap.org/img/wn/01d@2x.png"
}
