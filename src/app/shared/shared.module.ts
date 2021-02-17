import { CommonModule } from '@angular/common';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { PatientDialogComponent } from './components/patient-dialog/patient-dialog.component';


@NgModule({
  declarations: [AppointmentDialogComponent, PatientDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule, CommonModule, LayoutModule],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule, CommonModule, LayoutModule]
})
export class SharedModule { }
