import { describe, it, expect, afterEach } from 'vitest';
import { fetchWeather, ApiError, buildOpenWeatherForecastUrl } from './weather';
import { server } from '../mocks/server';
import { errorHandlers } from '../mocks/handlers';

describe('buildOpenWeatherForecastUrl', () => {
  it('都市名から正しいURLを構築する', () => {
    const url = buildOpenWeatherForecastUrl('Tokyo');
    expect(url).toContain(
      'https://api.openweathermap.org/data/2.5/forecast?q=Tokyo&appid='
    );
    expect(url).toContain('&units=metric&lang=ja');
  });

  it('都市名にスペースが含まれる場合、エンコードされる', () => {
    const url = buildOpenWeatherForecastUrl('New York');
    expect(url).toContain('q=New+York');
  });

  it('特殊文字が含まれる場合、適切にエンコードされる', () => {
    const url = buildOpenWeatherForecastUrl('São Paulo');
    expect(url).toContain('q=S%C3%A3o+Paulo');
  });
});

describe('fetchWeather', () => {
  it('正常にWeatherApiResponseを取得できる', async () => {
    const url = buildOpenWeatherForecastUrl('Tokyo');
    const result = await fetchWeather(url);

    expect(result.cod).toBe('200');
    expect(result.list).toHaveLength(3);
    expect(result.list[0].main.temp).toBe(15.5);
    expect(result.city.name).toBe('Tokyo');
  });

  describe('エラーハンドリング', () => {
    afterEach(() => {
      server.resetHandlers();
    });

    it('401エラーの場合、ApiErrorをthrowする', async () => {
      server.use(errorHandlers.unauthorized);
      const url = buildOpenWeatherForecastUrl('Tokyo');

      await expect(fetchWeather(url)).rejects.toThrow(ApiError);
      await expect(fetchWeather(url)).rejects.toThrow(
        'Weather API request failed: 401'
      );
    });

    it('404エラーの場合、ApiErrorをthrowする', async () => {
      server.use(errorHandlers.notFound);
      const url = buildOpenWeatherForecastUrl('Tokyo');
      await expect(fetchWeather(url)).rejects.toThrow(ApiError);
    });

    it('500エラーの場合、ApiErrorをthrowする', async () => {
      server.use(errorHandlers.serverError);
      const url = buildOpenWeatherForecastUrl('Tokyo');
      await expect(fetchWeather(url)).rejects.toThrow(ApiError);
    });

    it('429エラーの場合、ApiErrorをthrowする', async () => {
      server.use(errorHandlers.rateLimited);
      const url = buildOpenWeatherForecastUrl('Tokyo');
      await expect(fetchWeather(url)).rejects.toThrow(ApiError);
    });

    it('ApiErrorにはstatusプロパティが含まれる', async () => {
      server.use(errorHandlers.unauthorized);
      const url = buildOpenWeatherForecastUrl('Tokyo');

      try {
        await fetchWeather(url);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(401);
      }
    });
  });
});
