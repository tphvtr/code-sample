import { Router } from '@angular/router';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tabs, themeImgs } from 'src/app/configs';
import { Tab } from 'src/app/models';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuModalComponent {
  tabs: Tab[] = Tabs;
  imgUrl: string;

  constructor(public dialog: MatDialogRef<MenuModalComponent>,
              @Inject(MAT_DIALOG_DATA) public theme: string,
              private _themeService: ThemeService,
              private _router: Router) {
                this.imgUrl = themeImgs[theme]['logo'];
  }

  onAction(e: string): void {
    if (e) {
      this.dialog.close();
    }
  }

  onGoHome(): void {
    this._router.navigate(['/']);
  }

  onThemeChange(e: 'default' | 'dark'): void {
    this.imgUrl = themeImgs[e]['logo'];
    this._themeService.setTheme(e);
    this.dialog.close();
  }

}
