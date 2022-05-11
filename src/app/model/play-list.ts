import {User} from './user';
import {Song} from './song';

export interface PlayList {
  id?: number;
  name?: string;
  createdDate?: string;
  song?: Song;
  user?: User;
  lastUpdate?: string;
  views?: number;
}
