export interface Student {
  id?: string;
  name: string;
  age: string;
  mark: string;
  city: string;
  gender: 'male' | 'female';
  createAt: number;
  updateAt: number;
}
