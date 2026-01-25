import { formatDateLabel } from '../utils/dateFormat';

interface DateLabelProps {
  dateTime: string;
}

export function DateLabel({ dateTime }: DateLabelProps) {
  return (
    <div
      data-testid="date-label"
      className="bg-gray-200 px-4 py-2 border-b border-gray-200 mt-4 first:mt-0"
    >
      <p className="text-sm font-semibold text-gray-700">
        {formatDateLabel(dateTime)}
      </p>
    </div>
  );
}
