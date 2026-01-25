import { describe, it, expect } from 'vitest';
import { getCityById } from './cities';

describe('getCityById', () => {
  it('有効なIDで地域を返す', () => {
    const city = getCityById('tokyo');
    expect(city?.name).toBe('東京');
  });

  it('無効なIDでundefinedを返す', () => {
    const city = getCityById('invalid');
    expect(city).toBeUndefined();
  });
});
