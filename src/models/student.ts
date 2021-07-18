export interface IStudent {
  id?: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  city: string;
  mark: number;

  createdAt?: number;
  updatedAt?: number;
}