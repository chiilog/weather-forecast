import { useParams, Link } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import { WeatherList } from '../components/WeatherList';
import { getCityById } from '../constants/cities';
import type { CityId } from '../types/city';
import type { WeatherApiResponse } from '../types/weather';
import type { WeatherListItemProps } from '../types/weather';

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
  return data.list.map((item) => ({
    dateTime: item.dt_txt,
    iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    temperature: Math.round(item.main.temp * 10) / 10,
    description: item.weather[0].description,
  }));
};

export function WeatherPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const city = getCityById(cityId ?? '');
  const { data, isLoading, isError } = useWeather(cityId as CityId);

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

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <p className="text-red-600">天気データの取得に失敗しました</p>
        <Link to="/" className="text-blue-600">
          ← ホームへ戻る
        </Link>
      </div>
    );
  }

  const items = convertToWeatherListItems(data!);

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
