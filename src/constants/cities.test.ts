import { describe, it, expect } from 'vitest';
import { CITIES, getCityById, isValidCityId } from './cities';

describe('cities', () => {
  describe('CITIES', () => {
    it('4つの地域が定義されている', () => {
      expect(CITIES).toHaveLength(4);
    });

    it('すべての地域に必要なプロパティがある', () => {
      CITIES.forEach((city) => {
        expect(city).toHaveProperty('id');
        expect(city).toHaveProperty('nameJa');
        expect(city).toHaveProperty('nameEn');
      });
    });
  });

  describe('getCityById', () => {
    it('有効なIDで地域を取得できる', () => {
      const tokyo = getCityById('tokyo');
      expect(tokyo).toEqual({
        id: 'tokyo',
        nameJa: '東京',
        nameEn: 'Tokyo',
      });
    });

    it('無効なIDではundefinedを返す', () => {
      const result = getCityById('invalid');
      expect(result).toBeUndefined();
    });
  });

  describe('isValidCityId', () => {
    it('有効なIDでtrueを返す', () => {
      expect(isValidCityId('tokyo')).toBe(true);
      expect(isValidCityId('hyogo')).toBe(true);
      expect(isValidCityId('oita')).toBe(true);
      expect(isValidCityId('hokkaido')).toBe(true);
    });

    it('無効なIDでfalseを返す', () => {
      expect(isValidCityId('invalid')).toBe(false);
      expect(isValidCityId('')).toBe(false);
    });
  });
});
