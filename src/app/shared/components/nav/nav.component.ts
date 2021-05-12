import { Crumb } from './crumb';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() width: number;
  @Input() crumbs: Crumb[] = [];
  constructor(public location: Location,
              private  _router: Router) { }

  onNavigate(url: string): void {
    if (url) {
      this._router.navigate([url]);
    }
  }

}
