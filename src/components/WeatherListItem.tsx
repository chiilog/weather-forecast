// TODO: Issue #9 - 以下の作業を実施
// 1. getWeatherIconUrl関数をutils/weather.tsに作成（アイコンコード → URL変換）
// 2. formatDateTime関数をutils/date.tsに抽出
// 3. Props型をtypes/weather.tsに移動して整理
type WeatherListItemProps = {
  dateTime: string;
  iconUrl: string;
  temperature: number;
  description: string;
};

export const WeatherListItem = ({
  dateTime,
  iconUrl,
  temperature,
  description,
}: WeatherListItemProps) => {
  // TODO: Issue #9 - この関数をutils/date.tsに抽出する
  // Unix時刻を "MM/DD HH:mm" 形式にフォーマット（簡易版）
  const formatDateTime = (timestamp: string): string => {
    const date = new Date(Number(timestamp) * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex-1">
        <p className="text-sm text-gray-600">{formatDateTime(dateTime)}</p>
      </div>
      <div className="flex items-center gap-4">
        <img src={iconUrl} alt={description} className="h-12 w-12" />
        <div className="text-center">
          <p className="text-2xl font-bold">{temperature}℃</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};
