import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { TypeConsultation } from '../../../core/models/TypeConsultation';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {

  public appointmentForm: FormGroup;
  public typeConsultationList: any[];
  public praticienList: any[];
  public isDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.isDisabled = this.data.isDisabled;
    this.typeConsultationList = this.data.typeConsultationList;
    this.praticienList = this.data.praticienList;

    this.appointmentForm = this.formBuilder.group({
      idEvent: new FormControl({ value: this.data.idEvent, disabled: this.isDisabled }),
      idPatient: new FormControl({ value: this.data?.dataEvent?.idPatient, disabled: this.isDisabled }, [Validators.required]),
      startDate: new FormControl({ value: this.data.aptStart, disabled: this.isDisabled }, [Validators.required]),
      endDate: new FormControl({ value: this.data.aptEnd, disabled: this.isDisabled }, [Validators.required]),
      idPraticien: new FormControl({ value: this.data?.dataEvent?.idPraticien, disabled: this.isDisabled }, [Validators.required]),
      idTypeConsult: new FormControl({ value: this.data?.dataEvent?.idTypeConsult, disabled: this.isDisabled }, [Validators.required]),
    });

    this.initDataAppointement();
  }

  initDataAppointement(): void {
    this.appointmentForm.controls['idPatient'].patchValue(this.data?.dataEvent?.idPatient);
    this.appointmentForm.controls['idPraticien'].patchValue(this.data?.dataEvent?.idPraticien);
    this.appointmentForm.controls['idTypeConsult'].patchValue(this.data?.dataEvent?.idTypeConsult);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveAppointment(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.getRawValue());
    }
  }
}
