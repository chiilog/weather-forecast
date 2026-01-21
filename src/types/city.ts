export type CityId = 'tokyo' | 'hyogo' | 'oita' | 'hokkaido';

export type City = {
  id: CityId;
  nameJa: string;
  lat: number;
  lon: number;
};
