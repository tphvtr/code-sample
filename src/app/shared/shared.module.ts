import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material';

import { NavComponent } from './components/nav/nav.component';
import { TimesPipe } from 'src/app/shared/pipes/times.pipe';
import { GridComponent } from './components/grid/grid.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LogComponent } from './components/log/log.component';
import { GridItemComponent } from './components/grid/grid-item/grid-item.component';
import { TabComponent } from './components/tab/tab.component';
import { MenuModalComponent } from './modals/menu-modal/menu-modal.component';
import { UploadModalComponent } from './modals/upload-modal/upload-modal.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    NavComponent,
    TimesPipe,
    GridComponent,
    SpinnerComponent,
    LogComponent,
    GridItemComponent,
    TabComponent,
    MenuModalComponent,
    UploadModalComponent,
    ThemeToggleComponent
  ],
  exports: [
    NavComponent,
    TimesPipe,
    GridComponent,
    SpinnerComponent,
    LogComponent,
    GridItemComponent,
    TabComponent,
    MenuModalComponent,
    UploadModalComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSlideToggleModule
  ]
})
export class SharedModule { }
