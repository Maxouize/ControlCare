import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BlockchainComponent } from './blockchain.component';
import { BlockchainRoutingModule } from './blockchain-routing.module';

@NgModule({
  declarations: [BlockchainComponent],
  imports: [
    FullCalendarModule,
    CommonModule,
    BlockchainRoutingModule,
    SharedModule
  ]
})
export class BlockchainModule { }
