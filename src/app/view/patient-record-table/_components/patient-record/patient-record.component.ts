import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../core/services/general.service';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})
export class PatientRecordComponent implements OnInit {

  private idPatient: number;
  public patient: any;
  public isLoading = false;
  public derniereConsultation: any;
  public searchMedicamentCtrl = new FormControl();
  public filteredMedicaments: any;
  public errorMsg: string;

  constructor(private route: ActivatedRoute, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.route.params.forEach(urlParams => {
      this.idPatient = +urlParams['idPatient'];
    });

    this.patient = this.generalService.getConsultationByIdPatientValue(this.idPatient);
    console.log(this.patient);
    this.findMaxDateConsultation();
    this.autocompletionMedicament();
  }

  private findMaxDateConsultation() {
    this.derniereConsultation = _.maxBy(this.patient.consultation, function (value) {
      if (value.dateConsultation instanceof Date) {
        return value.dateConsultation;
      } else {
        return new Date(value.dateConsultation.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
      }
    });
  }

  public autocompletionMedicament() {
    this.searchMedicamentCtrl.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.filteredMedicaments = [];
        this.isLoading = true;
      }),
      map(value => this.generalService.getFilteredMedicamentsList(value))).subscribe(data => {
        console.log(data);
        this.errorMsg = "";
        this.filteredMedicaments = _.sortBy(data, 'title');
        this.isLoading = false;
        console.log(this.filteredMedicaments);
      });
  }

  public displayFn(medicament: any): string {
    return medicament && medicament.title ? medicament.title : '';
  }
}
