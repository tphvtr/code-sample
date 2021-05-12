import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Favourite, FavouriteParams, FavouriteCreate } from 'src/app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private _http: HttpService) {
  }

  getFavourites(params?: FavouriteParams): Observable<Favourite[]> {
    return this._http.get('favourites');
  }

  postToFavourites(data: FavouriteCreate): Observable<{message: string, id: number}> {
    return this._http.post('favourites', data);
  }

  removeFromFavourites(id: number): Observable<{message: string}> {
    return this._http.delete(`favourites/${id}`);
  }

}
