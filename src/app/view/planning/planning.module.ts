import { PlanningComponent } from './planning.component';
import { SharedModule } from '../../shared/shared.module';
import { PlanningRoutingModule } from './planning-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [PlanningComponent],
  imports: [
    FullCalendarModule,
    CommonModule,
    PlanningRoutingModule,
    SharedModule
  ]
})
export class PlanningModule { }
