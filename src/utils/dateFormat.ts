/**
 * dt_txt形式の日時文字列から日付部分（YYYY-MM-DD）を抽出する
 *
 * @param dtTxt - OpenWeatherMap APIのdt_txt形式の日時文字列（例: "2024-01-25 12:00:00"）
 * @returns YYYY-MM-DD形式の日付文字列（例: "2024-01-25"）
 */
export const extractDate = (dtTxt: string): string => {
  return dtTxt.split(' ')[0];
};

/**
 * 2つの日付文字列が同じ日付かどうかを判定する
 *
 * @param date1 - YYYY-MM-DD形式の日付文字列
 * @param date2 - YYYY-MM-DD形式の日付文字列
 * @returns 同じ日付の場合true、異なる場合false
 */
export const isSameDate = (date1: string, date2: string): boolean => {
  return date1 === date2;
};

/**
 * 日付が今日/明日/それ以外のどれに該当するかを判定する
 *
 * @param dateStr - YYYY-MM-DD形式の日付文字列
 * @param baseDate - 基準日（デフォルトは現在日時、テスト時に固定値を指定可能）
 * @returns 'today' - 今日の場合、'tomorrow' - 明日の場合、'other' - それ以外の場合
 */
export const getDateRelation = (
  dateStr: string,
  baseDate: Date = new Date()
): 'today' | 'tomorrow' | 'other' => {
  const targetDate = new Date(dateStr);
  const today = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate()
  );
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const target = new Date(
    targetDate.getUTCFullYear(),
    targetDate.getUTCMonth(),
    targetDate.getUTCDate()
  );

  if (target.getTime() === today.getTime()) {
    return 'today';
  } else if (target.getTime() === tomorrow.getTime()) {
    return 'tomorrow';
  } else {
    return 'other';
  }
};

/**
 * dt_txt形式の日時文字列から日付ラベルを生成する
 *
 * 今日の場合は「今日 YYYY-MM-DD」、明日の場合は「明日 YYYY-MM-DD」、
 * それ以外の場合は「YYYY-MM-DD」の形式で返す
 *
 * @param dtTxt - OpenWeatherMap APIのdt_txt形式の日時文字列（例: "2024-01-25 12:00:00"）
 * @param baseDate - 基準日（デフォルトは現在日時、テスト時に固定値を指定可能）
 * @returns フォーマットされた日付ラベル（例: "今日 2024-01-25"、"明日 2024-01-26"、"2024-01-27"）
 */
export const formatDateLabel = (
  dtTxt: string,
  baseDate: Date = new Date()
): string => {
  const dateStr = extractDate(dtTxt);
  const relation = getDateRelation(dateStr, baseDate);

  if (relation === 'today') {
    return `今日 ${dateStr}`;
  } else if (relation === 'tomorrow') {
    return `明日 ${dateStr}`;
  } else {
    return dateStr;
  }
};

/**
 * 日付ラベルを表示すべきかどうかを判定する
 *
 * 最初のアイテム、または前のアイテムと日付が変わる場合にtrueを返す
 *
 * @param currentDateTime - 現在のアイテムの日時（dt_txt形式）
 * @param previousDateTime - 前のアイテムの日時（dt_txt形式）。最初のアイテムの場合はnull
 * @returns 日付ラベルを表示すべき場合true、表示不要な場合false
 */
export const shouldShowDateLabel = (
  currentDateTime: string,
  previousDateTime: string | null
): boolean => {
  if (previousDateTime === null) {
    return true;
  }

  const currentDate = extractDate(currentDateTime);
  const previousDate = extractDate(previousDateTime);

  return !isSameDate(currentDate, previousDate);
};
