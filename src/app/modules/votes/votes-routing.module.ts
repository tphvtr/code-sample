import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotesComponent } from './votes.component';

const routes: Routes = [
  {
    path: '',
    component: VotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotesRoutingModule { }
