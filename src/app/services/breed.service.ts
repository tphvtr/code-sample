import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/services/http.service';
import { Breed, BreedParams } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  constructor(private _http: HttpService) { }

  getBreeds(params?: BreedParams): Observable<Breed[]> {
    return this._http.get('breeds', params);
  }

  getByQuery(query: string, params?: BreedParams): Observable<Breed[]> {
    return this._http.get(`breeds/search?q=${query}`, params);
  }
}
