import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule, MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { SharedModule } from './shared/shared.module';
import { MenuModalComponent } from 'src/app/shared/modals/menu-modal/menu-modal.component';
import { UploadModalComponent } from 'src/app/shared/modals/upload-modal/upload-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    SharedModule
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
  entryComponents: [MenuModalComponent, UploadModalComponent]
})
export class AppModule { }
