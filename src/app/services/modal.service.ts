import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

import { UploadModalComponent } from 'src/app/shared/modals/upload-modal/upload-modal.component';
import { MenuModalComponent } from 'src/app/shared/modals/menu-modal/menu-modal.component';

@Injectable({providedIn: 'root'})
export class ModalService {
  private _theme: string;

  constructor(public dialog: MatDialog) {
  }

  openUploadModal(theme: string): MatDialogRef<UploadModalComponent> {

    const dialogRef = this.dialog.open(UploadModalComponent, {
      panelClass: [`theme-${theme}`, 'upload-modal'],
    });

    return dialogRef;
  }

  openMobileMenuModal(theme: string): Observable<any> {
    const dialogRef = this.dialog.open(MenuModalComponent, {
      panelClass: `theme-${theme}`,
      position: {right: '0', left: '0'},
      width: '100%',
      maxWidth: '100%',
      data: theme
    });

    return dialogRef.afterClosed();
  }

  updateModalPosition(windowWidth, ref): void {
    const containerWidth = document.getElementById('app-wrap').clientWidth;
    if (containerWidth > 1300) {
      const config = new MatDialogConfig();
      config.position = {right: (windowWidth - containerWidth) / 2 + 'px'};
      ref.updatePosition(config.position);
    }
  }
}
