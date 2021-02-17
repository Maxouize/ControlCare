import { Router } from '@angular/router';
import { Patient, getPatientList, emptyPatient } from '../../core/models/Patient';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from '../../shared/components/patient-dialog/patient-dialog.component';
import { DatePipe } from '@angular/common';
import { GeneralService } from '../../core/services/general.service';

@Component({
  selector: 'app-patient-record-table',
  templateUrl: './patient-record-table.component.html',
  styleUrls: ['./patient-record-table.component.scss']
})
export class PatientRecordTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public filterForm: FormGroup;
  displayedColumns: string[] = ['nomPatient', 'prenomPatient', 'sexe', 'dateNaissancePatient', 'telephonePatient', 'action'];
  private patientList = [];
  dataSource = new MatTableDataSource();
  globalFilter = '';
  private filteredValues = emptyPatient();

  constructor(public dialog: MatDialog, private datepipe: DatePipe, private router: Router, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.generalService.getPatientListFromJson().subscribe((patientList) => {
      console.log(patientList);
      this.patientList = patientList;
      this.dataSource = new MatTableDataSource(this.patientList);

      this.dataSource.filterPredicate = ((data, filter) => {
        filter = JSON.parse(filter);
        const a = !filter.nomPatient || data.nomPatient.toLowerCase().includes(filter.nomPatient);
        const b = !filter.prenomPatient || data.prenomPatient.toLowerCase().includes(filter.prenomPatient);
        const dateFilter = this.datepipe.transform(filter.dateNaissancePatient, 'dd/MM/yyyy');
        const c = !filter.dateNaissancePatient || data.dateNaissancePatient === dateFilter;
        return a && b && c;
      }) as (Patient, string) => boolean;

      this.filterForm = new FormGroup({
        nomPatient: new FormControl(''),
        prenomPatient: new FormControl(''),
        dateNaissancePatient: new FormControl(''),
      });

      this.filterForm.controls.nomPatient.valueChanges.subscribe((nomFilterValue) => {
        this.filteredValues.nomPatient = nomFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.filterForm.controls.prenomPatient.valueChanges.subscribe((prenomFilterValue) => {
        this.filteredValues.prenomPatient = prenomFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.filterForm.controls.dateNaissancePatient.valueChanges.subscribe((dateNaissanceFilterValue) => {
        this.filteredValues.dateNaissancePatient = dateNaissanceFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   *
   */
  onSubmit(): void {
    console.log(this.filterForm.getRawValue());
  }

  clearDate(): void {
    this.filterForm.controls.dateNaissancePatient.reset();
  }
  /**
   * 
   * @param event 
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * 
   * @param idPatient 
   */
  consultPatientData(idPatient: number) {
    const patient = _.find(this.patientList, { 'idPatient': idPatient }) as Patient;

    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '800px',
      data: {
        patient,
        disabled: true,
        mode: 'Consultation'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {

      }
    });
  }

  /**
   * 
   * @param idPatient 
   */
  editPatientData(idPatient: number) {
    this.router.navigateByUrl(`patientRecord/${idPatient}`)
  }
}
