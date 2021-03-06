import {Role} from './role';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  role?: Role;
}
