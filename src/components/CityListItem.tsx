import { Link } from 'react-router-dom';
import type { City } from '../types/city';

type CityListItemProps = {
  city: City;
};

export function CityListItem({ city }: CityListItemProps) {
  return (
    <Link
      to={`/weather/${city.id}`}
      className="block p-4 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
    >
      <span className="text-lg text-gray-800">{city.nameJa}</span>
    </Link>
  );
}
