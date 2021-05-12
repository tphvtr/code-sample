export interface Favourite {
  id: number;
  image_id: string;
  image: {id: string; url: string};
  sub_id?: string;
  created_at: string;
}

export interface FavouriteParams {
  sub_id?: string;
  limit?: string;
  page?: string;
}

export interface FavouriteCreate {
  image_id: string;
  sub_id?: string;
}
