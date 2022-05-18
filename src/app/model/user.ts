import {Role} from './role';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  address?: string;
  role?: Role;
  image?: string;
}
