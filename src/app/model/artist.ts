import {Category} from './category';

export interface Artist {
  id?: number;
  name?: string;
  gender?: boolean;
  dateOfBirth?: string;
  story?: string;
  categories?: Category;
  band?: string;
  moreInfo?: string;
}
