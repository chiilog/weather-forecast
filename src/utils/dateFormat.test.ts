import { describe, it, expect } from 'vitest';
import {
  extractDate,
  isSameDate,
  getDateRelation,
  formatDateLabel,
  shouldShowDateLabel,
} from './dateFormat';

describe('extractDate', () => {
  it('dt_txtから日付部分を抽出する', () => {
    const result = extractDate('2024-01-25 12:00:00');
    expect(result).toBe('2024-01-25');
  });
});

describe('isSameDate', () => {
  it('同じ日付の場合trueを返す', () => {
    const result = isSameDate('2024-01-25', '2024-01-25');
    expect(result).toBe(true);
  });
});

describe('getDateRelation', () => {
  it('今日の日付の場合todayを返す', () => {
    const baseDate = new Date('2024-01-25T12:00:00');
    const result = getDateRelation('2024-01-25', baseDate);
    expect(result).toBe('today');
  });

  it('明日の日付の場合tomorrowを返す', () => {
    const baseDate = new Date('2024-01-25T12:00:00');
    const result = getDateRelation('2024-01-26', baseDate);
    expect(result).toBe('tomorrow');
  });

  it('それ以外の日付の場合otherを返す', () => {
    const baseDate = new Date('2024-01-25T12:00:00');
    const result = getDateRelation('2024-01-27', baseDate);
    expect(result).toBe('other');
  });
});

describe('formatDateLabel', () => {
  it('今日の場合、「今日 日付」形式で返す', () => {
    const baseDate = new Date('2024-01-25T12:00:00');
    const result = formatDateLabel('2024-01-25 12:00:00', baseDate);
    expect(result).toBe('今日 2024-01-25');
  });

  it('明日の場合、「明日 日付」形式で返す', () => {
    const baseDate = new Date('2024-01-25T12:00:00');
    const result = formatDateLabel('2024-01-26 12:00:00', baseDate);
    expect(result).toBe('明日 2024-01-26');
  });

  it('それ以外の場合、日付のみを返す', () => {
    const baseDate = new Date('2024-01-25T12:00:00');
    const result = formatDateLabel('2024-01-27 12:00:00', baseDate);
    expect(result).toBe('2024-01-27');
  });
});

describe('shouldShowDateLabel', () => {
  it('前のアイテムがない場合、trueを返す', () => {
    const result = shouldShowDateLabel('2024-01-25 12:00:00', null);
    expect(result).toBe(true);
  });

  it('前のアイテムと同じ日付の場合、falseを返す', () => {
    const result = shouldShowDateLabel(
      '2024-01-25 15:00:00',
      '2024-01-25 12:00:00'
    );
    expect(result).toBe(false);
  });

  it('前のアイテムと異なる日付の場合、trueを返す', () => {
    const result = shouldShowDateLabel(
      '2024-01-26 12:00:00',
      '2024-01-25 12:00:00'
    );
    expect(result).toBe(true);
  });
});
