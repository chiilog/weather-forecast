import { Fragment } from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

export function WeatherSkeletonItem() {
  return (
    <div
      className="bg-white border-b border-gray-200 p-4"
      data-testid="weather-skeleton-item"
    >
      <div className="h-5 w-40 bg-gray-300 rounded animate-pulse mb-1" />

      <div className="flex items-center justify-start gap-4">
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mt-1" />
        </div>

        <div className="h-8 w-24 bg-gray-300 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function DateSkeletonLabel() {
  return (
    <div
      className="bg-gray-200 px-4 py-2 border-b border-gray-200 mt-4 first:mt-0"
      data-testid="date-skeleton-label"
    >
      <div className="h-5 w-32 bg-gray-300 rounded animate-pulse" />
    </div>
  );
}

export function LoadingSkeleton({ count = 5 }: LoadingSkeletonProps) {
  const safeCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;

  return (
    <div role="status" aria-live="polite" aria-label="読み込み中">
      {Array.from({ length: safeCount }).map((_, index) => (
        <Fragment key={index}>
          {index % 4 === 0 && <DateSkeletonLabel />}
          <WeatherSkeletonItem />
        </Fragment>
      ))}
    </div>
  );
}
