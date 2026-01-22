import { WeatherListItem } from './WeatherListItem';

type WeatherListProps = {
  items: Array<{
    dateTime: number;
    iconUrl: string;
    temperature: number;
    description: string;
  }>;
};

export function WeatherList({ items }: WeatherListProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <WeatherListItem
          key={`${item.dateTime}-${index}`}
          dateTime={item.dateTime}
          iconUrl={item.iconUrl}
          temperature={item.temperature}
          description={item.description}
        />
      ))}
    </div>
  );
}
