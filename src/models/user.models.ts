import { Errand } from './errands.models';

export interface User {
  name: string;
  email: string;
  password: string;
  errands: Errand[];
}

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}
