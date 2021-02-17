import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientRecordTableComponent } from './patient-record-table.component';
import { PatientRecordComponent } from './_components/patient-record/patient-record.component';

const routes: Routes = [
  {
    path: '',
    component: PatientRecordTableComponent
  }, {
    path: ':idPatient',
    component: PatientRecordComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRecordTableRoutingModule { }
