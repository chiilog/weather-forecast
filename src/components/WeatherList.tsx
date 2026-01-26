import { Fragment } from 'react';
import type { WeatherListProps } from '../types/weather';
import { WeatherListItem } from './WeatherListItem';
import { DateLabel } from './DateLabel';
import { shouldShowDateLabel } from '../utils/dateFormat';

export function WeatherList({ items }: WeatherListProps) {
  return (
    <>
      {items.map((item, index) => {
        const previousDateTime = index > 0 ? items[index - 1].dateTime : null;
        const showDateLabel = shouldShowDateLabel(
          item.dateTime,
          previousDateTime
        );

        return (
          <Fragment key={`${item.dateTime}-${index}`}>
            {showDateLabel && <DateLabel dateTime={item.dateTime} />}
            <WeatherListItem
              dateTime={item.dateTime}
              iconUrl={item.iconUrl}
              temperature={item.temperature}
              description={item.description}
            />
          </Fragment>
        );
      })}
    </>
  );
}
