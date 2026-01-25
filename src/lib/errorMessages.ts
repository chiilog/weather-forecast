import { ApiError } from '../api/weather';

const ERROR_MESSAGES: Record<number, string> = {
  401: 'APIキーが無効です。設定を確認してください。',
  404: '指定された都市の天気情報が見つかりません。',
  429: 'APIのリクエスト制限を超過しました。しばらく待ってから再度お試しください。',
  500: 'サーバーでエラーが発生しました。時間をおいて再度お試しください。',
};

const DEFAULT_ERROR_MESSAGE =
  '通信エラーが発生しました。ネットワーク接続を確認してください。';

export const getErrorMessage = (error: unknown): string => {
  if (!(error instanceof ApiError)) {
    return DEFAULT_ERROR_MESSAGE;
  }
  return ERROR_MESSAGES[error.status] ?? DEFAULT_ERROR_MESSAGE;
};
