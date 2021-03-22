import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

export const CONTROLCARE_PATIENT = 'CONTROLCARE_PATIENT';
export const CONTROLCARE_STAFF = 'CONTROLCARE_STAFF';
export const CONTROLCARE_CONSULTATION = 'CONTROLCARE_CONSULTATION';
export const CONTROLCARE_TYPECONS = 'CONTROLCARE_TYPECONS';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private jsonDataUrl = 'assets/data_controlcare.json';
  private jsonMedicamentsUrl = 'assets/medicaments.json';
  private patientsData: BehaviorSubject<any>;
  private medicalStaffData: BehaviorSubject<any>;
  private consultationData: BehaviorSubject<any>;
  private typeConsultation: BehaviorSubject<any>;
  private medicamentsList: any[];

  constructor(private http: HttpClient) {
    this.patientsData = new BehaviorSubject(JSON.parse(localStorage.getItem(CONTROLCARE_PATIENT)));
    this.medicalStaffData = new BehaviorSubject(JSON.parse(localStorage.getItem(CONTROLCARE_STAFF)));
    this.consultationData = new BehaviorSubject(JSON.parse(localStorage.getItem(CONTROLCARE_CONSULTATION)));
    this.typeConsultation = new BehaviorSubject(JSON.parse(localStorage.getItem(CONTROLCARE_TYPECONS)));
  }

  public parseStringToDate(dateToParse: string): Date {
    const dateArray = dateToParse.split("/");
    return new Date(dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]);
  }

  public parseStringToDateHour(dateToParse: string): Date {
    const dateArray = dateToParse.split("/");
    const date = new Date(dateToParse);
    date.setDate(+dateArray[0]);
    date.setMonth(+dateArray[1]);

    return date;
  }

  public storeAllData(): any {
    this.http.get(this.jsonDataUrl, { responseType: "text" }).subscribe(response => {
      const allData = JSON.parse(response);
      this.storePatientsData(_.map(allData, o => { return _.omit(o, 'consultation') }));
      this.storeMedicalStaff(_.uniqBy(_.map(_.flatten(_.map(allData, 'consultation')), 'praticien'), 'idPraticien'));
      this.storeTypeConsultation(_.uniqBy(_.map(_.flatten(_.map(allData, 'consultation')), 'typeConsultation'), 'idTypeConsult'));
      this.storeConsultationData(allData);
    });
    this.http.get(this.jsonMedicamentsUrl, { responseType: "text" }).subscribe(response => {
      this.medicamentsList = JSON.parse(response);
    });
  }

  //////////////////////
  ////// PATIENTS //////
  //////////////////////

  public storePatientsData(patients: any[]): void {
    this.patientsData.next(patients);
    localStorage.setItem(CONTROLCARE_PATIENT, JSON.stringify(patients));
  }

  public getStoredPatients(): Observable<any> {
    return this.patientsData.asObservable();
  }

  public getStoredPatientsValue(): any {
    return this.patientsData.getValue()
  }

  public clearStoredPatients(): void {
    this.patientsData.next(null);
    localStorage.removeItem(CONTROLCARE_PATIENT);
  }

  public getPatientById(idPatient: number): Observable<any> {
    const subjectPatient = new Subject<any>();
    this.getStoredPatients().subscribe((data) => {
      subjectPatient.next(_.find(data, { 'idPatient': idPatient }));
    });

    return subjectPatient.asObservable();
  }

  public getPatientByIdValue(idPatient: number): any {
    return _.find(this.getStoredPatientsValue(), { 'idPatient': idPatient });
  }

  ///////////////////////////
  ////// MEDICAL STAFF //////
  ///////////////////////////

  public storeMedicalStaff(staff: any[]): void {
    this.medicalStaffData.next(staff);
    localStorage.setItem(CONTROLCARE_STAFF, JSON.stringify(staff));
  }

  public getMedicalStaff(): Observable<any> {
    return this.medicalStaffData.asObservable();
  }

  public getMedicalStaffValue(): any {
    return this.medicalStaffData.getValue()
  }

  public clearMedicalStaff(): void {
    this.medicalStaffData.next(null);
    localStorage.removeItem(CONTROLCARE_STAFF);
  }

  public getMedicalStaffById(idPraticien: number): Observable<any> {
    const subjectMedicalStaff = new Subject<any>();
    this.getMedicalStaff().subscribe((data) => {
      subjectMedicalStaff.next(_.find(data, { 'idPraticien': idPraticien }));
    });

    return subjectMedicalStaff.asObservable();
  }

  public getMedicalStaffByIdValue(idPraticien: number): any {
    return _.find(this.getMedicalStaffValue(), { 'idPraticien': idPraticien });
  }

  ///////////////////////////
  ////// MEDICAL STAFF //////
  ///////////////////////////

  public storeTypeConsultation(tyypeConsultation: any[]): void {
    this.typeConsultation.next(tyypeConsultation);
    localStorage.setItem(CONTROLCARE_TYPECONS, JSON.stringify(tyypeConsultation));
  }

  public getTypeConsultation(): Observable<any> {
    return this.typeConsultation.asObservable();
  }

  public getTypeConsultationValue(): any {
    return this.typeConsultation.getValue();
  }

  public cleatTypeConsultation(): void {
    this.typeConsultation.next(null);
    localStorage.removeItem(CONTROLCARE_TYPECONS);
  }

  public getTypeConsultationById(idTypeConsult: number): Observable<any> {
    const subjectTypeConsult = new Subject<any>();
    this.getTypeConsultation().subscribe((data) => {
      subjectTypeConsult.next(_.find(data, { 'idTypeConsult': idTypeConsult }));
    });

    return subjectTypeConsult.asObservable();
  }

  public getTypeConsultationByIdValue(idTypeConsult: number): any {
    return _.find(this.getTypeConsultationValue(), { 'idTypeConsult': idTypeConsult });
  }

  ///////////////////////////
  ////// CONSULTATIONS //////
  ///////////////////////////

  public storeConsultationData(consultations: any[]): void {
    this.consultationData.next(consultations);
    localStorage.setItem(CONTROLCARE_CONSULTATION, JSON.stringify(consultations));
  }

  public getConsultation(): Observable<any> {
    return this.consultationData.asObservable();
  }

  public getConsultationValue(): any {
    return this.consultationData.getValue();
  }

  public clearConsultation(): void {
    this.consultationData.next(null);
    localStorage.removeItem(CONTROLCARE_CONSULTATION);
  }

  public getConsultationByIdPatientValue(idPatient: number): any {
    return _.find(this.getConsultationValue(), { 'idPatient': idPatient });
  }

  public addConsultation(calendarEvent: any) {
    const consultations = this.getConsultationValue();
    const patient = _.find(consultations, { 'idPatient': calendarEvent.idPatient });
    const praticien = this.getMedicalStaffByIdValue(+calendarEvent.idPraticien);
    const typeConsultation = this.getTypeConsultationByIdValue(+calendarEvent.idTypeConsult);
    patient.consultation.push({
      dateConsultation: calendarEvent.start,
      fichier: [],
      idConsultation: calendarEvent.id,
      motifConsultation: "",
      noteConsultation: "",
      ordonnance: null,
      praticien: praticien,
      typeConsultation: typeConsultation
    });
    this.storeConsultationData(consultations);
  }

  ///////////////////////////
  /////// MEDICAMENTS ///////
  ///////////////////////////

  public getFilteredMedicamentsList(medicament: string): any[] {
    const filterValue = medicament.toLowerCase();
    return this.medicamentsList.filter(medicament => {
      return medicament.title.toLowerCase().includes(filterValue)
    });
  }

}
