import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../../core/models/Patient';
import * as _ from 'lodash';
import { GeneralService } from '../../../../core/services/general.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})
export class PatientRecordComponent implements OnInit {

  private idPatient: number;
  public patient: any; // Patient;
  public derniereConsultation: any;
  constructor(private route: ActivatedRoute, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.route.params.forEach(urlParams => {
      this.idPatient = +urlParams['idPatient'];
    });

    this.generalService.getPatientById(this.idPatient).subscribe((patient => {
      this.patient = patient;
      console.log(this.patient);
      this.derniereConsultation = _.maxBy(this.patient.consultation, function (value) { return new Date(value.dateConsultation.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) });
    }))
  }

}
