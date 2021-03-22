import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.scss']
})
export class PatientDialogComponent implements OnInit {

  public patientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private generalService: GeneralService) { }

  ngOnInit(): void {

    const isFormDisabled = this.data.disabled;
    this.patientForm = new FormGroup({
      idPatient: new FormControl({ value: this.data.patient.idPatient, disabled: isFormDisabled }, Validators.required),
      nomPatient: new FormControl({ value: this.data.patient.nomPatient, disabled: isFormDisabled }, Validators.required),
      prenomPatient: new FormControl({ value: this.data.patient.prenomPatient, disabled: isFormDisabled }, Validators.required),
      sexe: new FormControl({ value: this.data.patient.sexe, disabled: isFormDisabled }, Validators.required),
      telephonePatient: new FormControl({ value: this.data.patient.telephonePatient, disabled: isFormDisabled }, Validators.required),
      dateNaissancePatient: new FormControl({ value: this.generalService.parseStringToDate(this.data.patient.dateNaissancePatient), disabled: isFormDisabled }, Validators.required),
      adressePatient: new FormControl({ value: this.data.patient.adressePatient, disabled: isFormDisabled }, Validators.required),
      codeAssurance: new FormControl({ value: this.data.patient.codeAssurance, disabled: isFormDisabled }, Validators.required),
      nomPersPrevenir: new FormControl({ value: this.data.patient.nomPersPrevenir, disabled: isFormDisabled }, Validators.required),
      telPersPrevenir: new FormControl({ value: this.data.patient.telPersPrevenir, disabled: isFormDisabled }, Validators.required),
    });
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveAppointment(): void {
    if (this.patientForm.valid) {
      this.dialogRef.close(this.patientForm.getRawValue());
    }
  }
}
