import {Song} from './song';
import {User} from './user';
import {PlayList} from './play-list';

export interface LikePlaylist {
  id?: number;
  value?: boolean;
  playlist?: PlayList;
  user?: User;
}
