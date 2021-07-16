export interface Student {
  id?: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  city: string;

  createdAt?: number;
  updatedAt?: number;
}