import {Role} from './role';

export interface UserToken {
  id?: number;
  username?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  role?: Role;
  accessToken?: string;
}
