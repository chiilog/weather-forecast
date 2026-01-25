/**
 * WeatherListItemコンポーネントで使用するProps型
 * 将来的にAPIレスポンスから変換する際の型としても使用
 */
export type WeatherListItemProps = {
  dateTime: string;
  iconUrl: string;
  temperature: number;
  description: string;
};

/**
 * WeatherListコンポーネントで使用するProps型
 */
export type WeatherListProps = {
  items: WeatherListItemProps[];
};

/**
 * OpenWeatherMap API の予報データ1件分の型
 * 3時間ごとの天気予報情報を表す
 */
export type WeatherForecastItem = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
};

/**
 * OpenWeatherMap API レスポンス型
 */
export type WeatherApiResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};
