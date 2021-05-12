import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  path = 'https://api.thedogapi.com/v1';

  constructor(private _http: HttpClient) { }

  get(url, options?): Observable<any> {
    const _headers = this._getHeaders();

    return this._http.get(`${this.path}/${url}`, {headers: _headers, params: options})
      .pipe(catchError(err => err));
  }

  post(url, body, options?): Observable<any> {
    const _headers = this._getHeaders();

    return this._http.post(`${this.path}/${url}`, body, {headers: _headers, params: options})
      .pipe(catchError(err => err));
  }

  postForm(url, body, options?): Observable<any> {
    const _headers = new HttpHeaders().append('x-api-key', environment.apiKey);

    return this._http.post(`${this.path}/${url}`, body, {headers: _headers, params: options});
  }

  delete(url, options?): Observable<any> {
    const _headers = this._getHeaders();

    return this._http.delete(`${this.path}/${url}`, {headers: _headers, params: options})
      .pipe(catchError(err => err));
  }

  private _getHeaders(): HttpHeaders {
    return new HttpHeaders().append('x-api-key', environment.apiKey)
      .append('Content-Type', 'application/json');
  }
}
