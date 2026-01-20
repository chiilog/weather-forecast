import type { City, CityId } from '../types/weather';

/**
 * 対応地域一覧
 */
export const CITIES: City[] = [
  { id: 'tokyo', nameJa: '東京', nameEn: 'Tokyo' },
  { id: 'hyogo', nameJa: '兵庫', nameEn: 'Hyogo' },
  { id: 'oita', nameJa: '大分', nameEn: 'Oita' },
  { id: 'hokkaido', nameJa: '北海道', nameEn: 'Hokkaido' },
];

/**
 * IDから地域を取得
 * @param id 地域ID
 * @returns 地域データ。見つからない場合は undefined
 */
export function getCityById(id: string): City | undefined {
  return CITIES.find((city) => city.id === id);
}

/**
 * 有効な地域IDかどうかを判定
 * @param id 検証するID
 * @returns 有効な CityId なら true
 */
export function isValidCityId(id: string): id is CityId {
  return CITIES.some((city) => city.id === id);
}
