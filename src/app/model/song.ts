import {User} from './user';
import {Album} from './album';
import {PlayList} from './play-list';
import {Category} from './category';
import {Artist} from './artist';
import {Tag} from './tag';

export interface Song {
  id?: number;
  name?: string;
  description?: string;
  mp3File?: string;
  image?: string;
  author?: string;
  artist?: Artist;
  user?: User;
  category?: Category;
  album?: Album;
  tag?: Tag;
  views?: number;
  likes?: number;
  comment?: number;
}
