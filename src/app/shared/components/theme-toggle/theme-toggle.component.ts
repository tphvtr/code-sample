import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  @Output() action = new EventEmitter<string>();
  theme$: Observable<string>;

  constructor(private _themeService: ThemeService) {
    this.theme$ = this._themeService.theme$.asObservable();
  }

  onThemeChange(e: {checked: boolean}): void {
    this.action.emit(e.checked ? 'default' : 'dark' );
  }

}
