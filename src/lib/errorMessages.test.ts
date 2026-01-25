import { describe, it, expect } from 'vitest';
import { ApiError } from '../api/weather';
import { getErrorMessage } from './errorMessages';

describe('getErrorMessage', () => {
  it('401エラーの場合、APIキーが無効である旨のメッセージを返す', () => {
    const error = new ApiError('Unauthorized', 401);
    expect(getErrorMessage(error)).toBe(
      'APIキーが無効です。設定を確認してください。'
    );
  });

  it('404エラーの場合、都市が見つからない旨のメッセージを返す', () => {
    const error = new ApiError('Not Found', 404);
    expect(getErrorMessage(error)).toBe(
      '指定された都市の天気情報が見つかりません。'
    );
  });

  it('429エラーの場合、レート制限超過の旨のメッセージを返す', () => {
    const error = new ApiError('Too Many Requests', 429);
    expect(getErrorMessage(error)).toBe(
      'APIのリクエスト制限を超過しました。しばらく待ってから再度お試しください。'
    );
  });

  it('500エラーの場合、サーバーエラーの旨のメッセージを返す', () => {
    const error = new ApiError('Internal Server Error', 500);
    expect(getErrorMessage(error)).toBe(
      'サーバーでエラーが発生しました。時間をおいて再度お試しください。'
    );
  });

  it('ApiErrorでないエラーの場合、ネットワークエラーの旨のメッセージを返す', () => {
    const error = new Error('Network error');
    expect(getErrorMessage(error)).toBe(
      '通信エラーが発生しました。ネットワーク接続を確認してください。'
    );
  });
  it('定義されていないステータスコードを持つApiErrorの場合、デフォルトのエラーメッセージを返す', () => {
    const error = new ApiError('Forbidden', 403);
    expect(getErrorMessage(error)).toBe(
      '通信エラーが発生しました。ネットワーク接続を確認してください。'
    );
  });
});
