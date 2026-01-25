import { Link } from 'react-router-dom';
import type { City } from '../types/city';

type CityListItemProps = {
  city: City;
};

export function CityListItem({ city }: CityListItemProps) {
  return (
    <Link
      to={`/weather/${city.id}`}
      className="group flex items-center justify-between p-4 bg-white border border-gray-200 hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200"
    >
      <span className="flex-1 text-lg text-blue-600 group-hover:text-blue-700">
        {city.name}
      </span>
      <span
        className="material-symbols-outlined text-blue-500 group-hover:text-blue-600 transition-colors duration-200"
        aria-hidden="true"
      >
        chevron_right
      </span>
    </Link>
  );
}
