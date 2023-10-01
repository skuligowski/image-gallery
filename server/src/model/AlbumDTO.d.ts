import { Image } from '../api';

export interface AlbumDTO {
  _id?: string;
  name: string;
  permalink: string;
  date?: string; // date
  thumbUrl?: string;
  lastModified: string; // date-time
  createDate: string; // date-time
  active: boolean;
  images: Image[];
}
