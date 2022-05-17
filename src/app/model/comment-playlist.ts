import {Song} from './song';
import {User} from './user';
import {PlayList} from './play-list';

export interface CommentPlaylist {
  id?: number;
  comment?: string;
  song?: PlayList;
  user?: User;
}
