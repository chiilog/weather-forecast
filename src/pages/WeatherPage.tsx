import { useParams, Link } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import { WeatherList } from '../components/WeatherList';
import { getCityById } from '../constants/cities';
import type {
  WeatherApiResponse,
  WeatherForecastItem,
  WeatherListItemProps,
} from '../types/weather';

/**
 * 天気データからアイコンURLを生成する
 *
 * @param weather - 天気データ配列
 * @returns アイコンURL、データがない場合は空文字列
 */
const getWeatherIconUrl = (weather: WeatherForecastItem['weather']): string => {
  if (!weather || weather.length === 0) {
    return '';
  }
  return `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
};

/**
 * 天気の説明を取得する
 *
 * @param weather - 天気データ配列
 * @returns 天気の説明、データがない場合は空文字列
 */
const getWeatherDescription = (
  weather: WeatherForecastItem['weather']
): string => {
  return weather?.[0]?.description ?? '';
};

/**
 * OpenWeatherMap APIのレスポンスをWeatherListコンポーネント用の形式に変換する
 *
 * @param data - OpenWeatherMap APIのレスポンスデータ
 * @returns WeatherListコンポーネントに渡すアイテムの配列
 *
 * @remarks
 * - 気温は小数第1位に丸められます
 * - 天気アイコンのURLはOpenWeatherMapの公式CDNを使用します
 */
const convertToWeatherListItems = (
  data: WeatherApiResponse
): WeatherListItemProps[] => {
  return data.list.map((item: WeatherForecastItem) => ({
    dateTime: item.dt_txt,
    iconUrl: getWeatherIconUrl(item.weather),
    temperature: Math.round(item.main.temp * 10) / 10,
    description: getWeatherDescription(item.weather),
  }));
};

export function WeatherPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const city = getCityById(cityId ?? '');
  const { data, isLoading, isError } = useWeather(cityId);

  if (!city) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <p className="text-red-600">都市が見つかりません</p>
        <Link to="/" className="text-blue-600">
          ← ホームへ戻る
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <p className="text-red-600">天気データの取得に失敗しました</p>
        <Link to="/" className="text-blue-600">
          ← ホームへ戻る
        </Link>
      </div>
    );
  }

  const items = convertToWeatherListItems(data);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-4 flex items-center gap-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ← 戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{city.name}の天気</h1>
      </header>
      <main>
        <WeatherList items={items} />
      </main>
    </div>
  );
}
