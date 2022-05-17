import {Song} from './song';
import {User} from './user';
import {Artist} from './artist';

export interface CommentArtist {
  id?: number;
  content?: string;
  song?: Artist;
  user?: User;
}
