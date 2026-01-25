import type { WeatherListItemProps } from '../types/weather';

export const WeatherListItem = ({
  dateTime,
  iconUrl,
  temperature,
  description,
}: WeatherListItemProps) => {
  return (
    <div className="bg-white border-b border-gray-200 p-2">
      <p className="text-sm text-gray-600 mb-1">{dateTime}</p>
      <div className="flex items-center justify-start gap-4">
        <div className="flex flex-col items-center">
          <img src={iconUrl} alt={description} className="h-20 w-20" />
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <p className="text-2xl font-bold">{temperature}℃</p>
      </div>
    </div>
  );
};
