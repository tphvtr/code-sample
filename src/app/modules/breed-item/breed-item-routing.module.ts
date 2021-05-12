import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedItemComponent } from './breed-item.component';

const routes: Routes = [
  {
    path: '',
    component: BreedItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreedItemRoutingModule { }
