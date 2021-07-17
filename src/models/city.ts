export interface City {
  code: string;
  name: string;
}

export interface CityMap {
  [code: string]: City;
}