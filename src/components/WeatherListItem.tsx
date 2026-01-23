import type { WeatherListItemProps } from '../types/weather';

export const WeatherListItem = ({
  dateTime,
  iconUrl,
  temperature,
  description,
}: WeatherListItemProps) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex-1">
        <p className="text-sm text-gray-600">{dateTime}</p>
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
