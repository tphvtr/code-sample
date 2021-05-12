import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Vote } from 'src/app/models/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private _http: HttpService) { }

  createVote(data: Vote, params?: any): Observable<{message: string, id: number}> {
    return this._http.post('votes', data, params);
  }

  getVotes(): Observable<Vote[]> {
    return this._http.get('votes');
  }

  deleteVote(id: number): Observable<{message: string}> {
    return this._http.delete(`votes/${id}`);
  }
}
