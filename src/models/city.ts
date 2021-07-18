export interface ICity {
  code: string;
  name: string;
}

export interface ICityMap {
  [code: string]: ICity;
}