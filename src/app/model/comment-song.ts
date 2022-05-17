import {PlayList} from './play-list';
import {User} from './user';
import {Song} from './song';

export interface CommentSong {
  id?: number;
  content?: string;
  song?: Song;
  user?: User;
}
