import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Dog, DogParams, ImageParams, Image } from './../models';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(private _http: HttpService) {
  }

  getDogs(params?: DogParams): Observable<Dog[]> {
    if (params && (!params.breed_id || params.breed_id === 'ALL')) {
      delete params.breed_id;
    }

    return this._http.get('images/search', params);
  }

  getImage(id: string, params?: DogParams): Observable<Image> {
    return this._http.get(`images/${id}`, params);
  }

  uploadImage(data: FormData): Observable<{level: string, message: string, status: number}> {
    return this._http.postForm(`images/upload`, data);
  }
}
