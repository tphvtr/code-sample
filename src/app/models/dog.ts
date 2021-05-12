export interface Dog {
  breeds: Breed[];
  categories: Category[];
  id: string;
  url: string;
}

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  reference_image_id: string;
}

export interface BreedParams {
  attach_breed?: number;
  page?: number;
  limit?: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface DogParams {
  size?: 'full' | 'med' | 'small' | 'thumb'  ;
  mime_types?: string[];
  order?: 'RANDOM' | 'ASC' | 'DESC';
  limit?: number;
  page?: number;
  category_ids?: number[];
  format?: 'json' | 'src';
  breed_id?: string;
}
