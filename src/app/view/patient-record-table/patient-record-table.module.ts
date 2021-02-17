import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRecordTableRoutingModule } from './patient-record-table-routing.module';
import { PatientRecordTableComponent } from './patient-record-table.component';
import { PatientRecordComponent } from './_components/patient-record/patient-record.component';

@NgModule({
  declarations: [PatientRecordTableComponent,
    PatientRecordComponent],
  imports: [
    CommonModule,
    PatientRecordTableRoutingModule,
    SharedModule
  ]
})
export class PatientRecordTableModule { }
