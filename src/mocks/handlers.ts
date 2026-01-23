import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// モックデータ（OpenWeatherMap API 5 Day / 3 Hour Forecast の実際のレスポンス構造に準拠）
const mockWeatherResponse = {
  cod: '200',
  message: 0,
  cnt: 3,
  list: [
    {
      dt: 1705752000, // 2024-01-20 12:00:00 UTC
      main: {
        temp: 15.5,
        feels_like: 14.2,
        temp_min: 15.5,
        temp_max: 16.8,
        pressure: 1013,
        humidity: 75,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: '快晴',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 3.5,
        deg: 180,
        gust: 5.2,
      },
      visibility: 10000,
      pop: 0.2,
      sys: {
        pod: 'd',
      },
      dt_txt: '2024-01-20 12:00:00',
    },
    {
      dt: 1705762800, // 2024-01-20 15:00:00 UTC
      main: {
        temp: 14.2,
        feels_like: 13.1,
        temp_min: 14.2,
        temp_max: 15.0,
        pressure: 1014,
        humidity: 78,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: '晴れ',
          icon: '02d',
        },
      ],
      clouds: {
        all: 20,
      },
      wind: {
        speed: 2.8,
        deg: 190,
        gust: 4.5,
      },
      visibility: 10000,
      pop: 0.1,
      sys: {
        pod: 'd',
      },
      dt_txt: '2024-01-20 15:00:00',
    },
    {
      dt: 1705773600, // 2024-01-20 18:00:00 UTC
      main: {
        temp: 12.8,
        feels_like: 11.5,
        temp_min: 12.8,
        temp_max: 13.5,
        pressure: 1015,
        humidity: 82,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: '曇り',
          icon: '03d',
        },
      ],
      clouds: {
        all: 40,
      },
      wind: {
        speed: 2.2,
        deg: 200,
        gust: 3.8,
      },
      visibility: 10000,
      pop: 0.3,
      sys: {
        pod: 'd',
      },
      dt_txt: '2024-01-20 18:00:00',
    },
  ],
  city: {
    id: 1850144,
    name: 'Tokyo',
    coord: {
      lat: 35.6895,
      lon: 139.6917,
    },
    country: 'JP',
    population: 13515271,
    timezone: 32400,
    sunrise: 1705707600,
    sunset: 1705744800,
  },
};

export const handlers = [
  http.get(`${API_BASE_URL}/forecast`, () => {
    return HttpResponse.json(mockWeatherResponse);
  }),
];

// エラーハンドラー（テスト用）
export const errorHandlers = {
  serverError: http.get(`${API_BASE_URL}/forecast`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
  notFound: http.get(`${API_BASE_URL}/forecast`, () => {
    return new HttpResponse(null, { status: 404 });
  }),
  unauthorized: http.get(`${API_BASE_URL}/forecast`, () => {
    return new HttpResponse(null, { status: 401 });
  }),
  rateLimited: http.get(`${API_BASE_URL}/forecast`, () => {
    return new HttpResponse(null, { status: 429 });
  }),
};
