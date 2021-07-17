export interface Student {
  id?: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  city: string;
  mark: number;

  createdAt?: number;
  updatedAt?: number;
}