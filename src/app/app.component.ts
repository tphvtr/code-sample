import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { ThemeService, ModalService } from 'src/app/services';
import { Tabs, themeImgs } from './configs';
import { Tab } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ModalService]
})
export class AppComponent {
  tabs: Tab[] = Tabs;
  imgUrl: string;
  router: Router;
  theme: 'default' | 'dark';
  constructor(private _router: Router,
              private _themeService: ThemeService,
              private _modalService: ModalService) {
      this.router = _router;
      this._themeSub();
  }

  onSearchBreed(query: string): void {
    this._router.navigate(['/search'], {queryParams: {query}});
  }

  onThemeChange(e: 'default' | 'dark'): void {
    this._themeService.setTheme(e);
  }

  onOpenMobileMenu(): void {
    this._modalService.openMobileMenuModal(this.theme);
  }

  private _themeSub(): void {
    this._themeService.theme$.subscribe(res => {
      this.theme = res;
      this.imgUrl = themeImgs[this.theme]['logo'];
    });
  }
}
