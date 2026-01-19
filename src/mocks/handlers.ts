import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// モックデータ
const mockWeatherResponse = {
  list: [
    {
      dt: 1705752000, // 2024-01-20 12:00:00 UTC
      main: { temp: 15.5 },
      weather: [{ icon: '01d' }],
    },
    {
      dt: 1705762800, // 2024-01-20 15:00:00 UTC
      main: { temp: 14.2 },
      weather: [{ icon: '02d' }],
    },
    {
      dt: 1705773600, // 2024-01-20 18:00:00 UTC
      main: { temp: 12.8 },
      weather: [{ icon: '03d' }],
    },
  ],
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
