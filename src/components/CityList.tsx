import { CITIES } from '../constants/cities';
import { CityListItem } from './CityListItem';

export function CityList() {
  return (
    <div className="space-y-2">
      {CITIES.map((city) => (
        <CityListItem key={city.id} city={city} />
      ))}
    </div>
  );
}
