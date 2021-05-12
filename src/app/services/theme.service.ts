import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme$ = new BehaviorSubject<'default' | 'dark'>('default');
  private _theme: 'default' | 'dark';
  constructor() {
    this.getTheme();
   }

  getTheme(): void {
    this._theme = localStorage.getItem('theme') as 'default' | 'dark';
    this._theme = this._theme && this._theme.length ? this._theme : 'default';
    this.theme$.next(this._theme);
    localStorage.setItem('theme', this._theme);
  }

  setTheme(val: 'dark' | 'default'): void {
    localStorage.setItem('theme', val);
    this.theme$.next(val);
  }
}
