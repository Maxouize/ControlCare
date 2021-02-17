import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs';

export const USER_KEY_CONTROLCARE = "USER_KEY_CONTROLCARE";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private jsnoDataUrl = 'assets/data_controlcare.json';

  constructor(private http: HttpClient) {
  }

  public getDataFromJson(): any {
    return this.http.get(this.jsnoDataUrl, { responseType: "text" });
  }

  public getPatientListFromJson(): Observable<any> {
    const subjectPatientList = new Subject<any>();
    this.getDataFromJson().subscribe((data) => {
      subjectPatientList.next(JSON.parse(data));
    });

    return subjectPatientList.asObservable();
  }

  public getPatientById(idPatient: number): Observable<any> {
    const subjectPatient = new Subject<any>();
    this.getPatientListFromJson().subscribe((data) => {
      subjectPatient.next(_.find(data, { 'idPatient': idPatient }));
    });

    return subjectPatient.asObservable();
  }
}
