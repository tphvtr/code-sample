import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Log, LogParams } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs$ = new BehaviorSubject<Log[]>([]);
  private _logs = [];

  constructor() {
    this._getLogs();
  }

  onAction(obj: LogParams): void {
    const today = new Date();
    let mins = today.getMinutes().toString();
    mins = mins.length < 2 ? `0${mins}` : mins;
    const log: Log = {
      id: obj.img_id,
      category: '',
      action: '',
      user_action: obj.user_action,
      time: `${today.getHours()}:${mins}`
    };
    log.category = obj.type === 'FAV'
      ? 'favourites'
      : obj.action === 0 ? 'dislikes'
                         : 'likes';
    this._logs.unshift(log);
    this.logs$.next(this._logs);
    localStorage.setItem('logs', JSON.stringify(this._logs));
  }

  private _getLogs(): void {
    const logs = localStorage.getItem('logs');
    this._logs = logs !== null && logs.length ? JSON.parse(logs) : [];
    this.logs$.next(this._logs);
  }


}
