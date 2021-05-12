import { Breed } from './dog';

export interface Image {
  height: number;
  width: number;
  id: string;
  url: string;
  breeds?: Breed[];
}

export interface ImageParams {
  file: string;
  sub_id?: string;
}
