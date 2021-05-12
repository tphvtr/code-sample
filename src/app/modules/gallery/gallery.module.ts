import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef} from '@angular/material';

import { ModalService } from 'src/app/services';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FormsModule,
    SharedModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef
    }
  ]
})
export class GalleryModule { }
