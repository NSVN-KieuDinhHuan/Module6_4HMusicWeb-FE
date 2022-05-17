import {Song} from './song';
import {User} from './user';

export interface LikeSong {
  id?: number;
  value?: boolean;
  song?: Song;
  user?: User;
}
