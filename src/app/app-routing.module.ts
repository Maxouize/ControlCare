import { AuthGuard } from './view/login/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./view/login/login.module').then(m => m.LoginModule)
  },
  // { path: 'home', component: HomeComponent },
  // { path: 'list', component: ListComponent },
  // { path: 'map', component: MapComponent },
  // { path: 'document', component: DocumentComponent },
  // { path: 'calendar', component: CalendarComponent },
  { path: 'planning', canActivate: [AuthGuard], loadChildren: () => import('./view/planning/planning.module').then(m => m.PlanningModule) },
  { path: 'patientRecord', canActivate: [AuthGuard], loadChildren: () => import('./view/patient-record-table/patient-record-table.module').then(m => m.PatientRecordTableModule) },
  // { path: 'settings', canActivate: [AuthGuard], loadChildren: () => import('./view/login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
