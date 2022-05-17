import {Song} from './song';
import {User} from './user';
import {Artist} from './artist';

export interface CommentArtist {
  id?: number;
  comment?: string;
  song?: Artist;
  user?: User;
}
