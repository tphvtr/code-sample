import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedItemRoutingModule } from './breed-item-routing.module';
import { BreedItemComponent } from './breed-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BreedItemComponent],
  imports: [
    CommonModule,
    BreedItemRoutingModule,
    SharedModule
  ]
})
export class BreedItemModule { }
