import {Song} from './song';
import {PlayList} from './play-list';

export interface SearchItem {
  listSong?: Song[];
  listPlaylist?: PlayList[];
}
