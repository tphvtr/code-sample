import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotingRoutingModule } from './voting-routing.module';
import { VotingComponent } from './voting.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VotingComponent],
  imports: [
    CommonModule,
    VotingRoutingModule,
    SharedModule
  ]
})
export class VotingModule { }
