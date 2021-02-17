import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {

  public appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.appointmentForm = new FormGroup({
      idEvent: new FormControl(this.data.idEvent),
      idPatient: new FormControl(this.data.selectedPatient, Validators.required),
      startDate: new FormControl(this.data.aptStart, Validators.required),
      endDate: new FormControl(this.data.aptEnd, Validators.required),
    });

    this.initDataAppointement();
  }

  initDataAppointement(): void {
    this.appointmentForm.controls['idPatient'].setValue(this.data.selectedPatient);
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
