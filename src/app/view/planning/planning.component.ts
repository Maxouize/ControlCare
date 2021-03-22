import { Patient } from './../../core/models/Patient';
import { AppointmentDialogComponent } from './../../shared/components/appointment-dialog/appointment-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessHoursInput, Calendar, EventInput, ViewContentArg } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import enLocale from '@fullcalendar/core/locales/en-gb';
import frLocale from '@fullcalendar/core/locales/fr';
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../../core/services/general.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  calendarOptions: CalendarOptions;
  businessHours: BusinessHoursInput;
  calendarEvents: EventInput[] = [];
  appointementTime: number;
  patientList: Patient[] = [];
  timeGridToolbar: string;
  timeGridInitialView: string;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  constructor(public dialog: MatDialog,
    private generalService: GeneralService) {
    const name = Calendar.name;
  }

  ngOnInit(): void {
    this.generalService.getStoredPatients().subscribe(patientList => {
      this.patientList = patientList;
      this.initCalendarOptions();
      this.initBusinessHours();
      this.initCalendarEvents();
    })
  }

  initCalendarOptions(): void {
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      plugins: [timeGridPlugin, interactionPlugin],
      locales: [enLocale, frLocale],
      locale: 'fr',
      droppable: true,
      editable: true,
      selectable: true,
      now: new Date(),
      contentHeight: 'auto',
      nowIndicator: true,
      headerToolbar: {
        left: 'title',
        center: 'timeGridWeek,timeGridDay',
        right: 'prev,next today', // myCustomButton
      },
      slotMinTime: '07:00:00',
      slotMaxTime: '21:00:00',
      eventClick: this.handleEventClick.bind(this),
      select: this.handleDateSelect.bind(this),
      // eventDragStop: this.handleEventDragStop.bind(this),
      // eventResize: this.handleEventDragStop.bind(this),
      windowResize: this.windowResize.bind(this)
    };
    this.appointementTime = 30;
  }

  initBusinessHours(): void {
    this.businessHours = [
      {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '08:00',
        endTime: '20:00'
      },
      {
        daysOfWeek: [6],
        startTime: '09:00',
        endTime: '18:00'
      }
    ];
    this.calendarOptions.businessHours = this.businessHours;
  }

  initCalendarEvents(): void {
    this.generalService.getConsultation().subscribe(consulationsList => {
      const calendarEvents = [];
      consulationsList.forEach(patient => {
        patient.consultation.forEach(consultation => {
          const dateConsultation = consultation.dateConsultation instanceof Date ? consultation.dateConsultation : this.generalService.parseStringToDateHour(consultation.dateConsultation);
          calendarEvents.push(this.reshapeAppointmentCalendar(patient.idPatient,
            patient.nomPatient,
            patient.prenomPatient,
            consultation.idConsultation,
            dateConsultation,
            consultation.praticien.idPraticien,
            consultation.typeConsultation.idTypeConsult
          ));
        });
      });
      this.calendarEvents = calendarEvents;
      this.calendarOptions.events = this.calendarEvents;
    });
  }

  handleDateSelect(arg): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px',
      data: {
        title: 'Prise de rendez-vous',
        aptStart: arg.start,
        aptEnd: arg.end, titleAction: 'Enregistrer',
        patientList: this.patientList,
        praticienList: this.generalService.getMedicalStaffValue(),
        typeConsultationList: this.generalService.getTypeConsultationValue(),
        isDisabled: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const max = +_.maxBy(_.map(this.calendarEvents, _.property('id'))) + 1;
        const patient = _.find(this.patientList, { idPatient: +result.idPatient }) as Patient;
        const consultationToAdd = this.reshapeAppointmentCalendar(patient.idPatient, patient.nomPatient, patient.prenomPatient, max,
          result.startDate, result.idPraticien, result.idTypeConsult)
        this.calendarEvents = this.calendarEvents.concat(consultationToAdd);
        this.calendarOptions.events = this.calendarEvents;
        this.generalService.addConsultation(consultationToAdd);
      }
    });
  }

  handleEventClick(arg): void {
    const patient = _.find(this.patientList, { idPatient: +arg.event.extendedProps.idPatient }) as Patient;
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px',
      data: {
        title: 'Rendez-vous de ' + patient.nomPatient + ' ' + patient.prenomPatient,
        aptStart: arg.event.start,
        aptEnd: arg.event.end,
        titleAction: 'Modifier', patientList: this.patientList,
        dataEvent: arg?.event?.extendedProps,
        idEvent: arg?.event?.id,
        praticienList: this.generalService.getMedicalStaffValue(),
        typeConsultationList: this.generalService.getTypeConsultationValue(),
        isDisabled: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const patientFound = _.find(this.patientList, { idPatient: +result.idPatient }) as Patient;
        const indexEvent = _.findIndex(this.calendarEvents, { id: result.idEvent });
        this.calendarEvents[indexEvent].end = result.endDate;
        this.calendarEvents[indexEvent].start = result.startDate;
        this.calendarEvents[indexEvent].idPatient = patientFound.idPatient;
        this.calendarEvents[indexEvent].title = patientFound.nomPatient + ' ' + patientFound.prenomPatient;
        this.calendarOptions.events = this.calendarEvents;
      }
    });
  }

  handleEventDragStop(arg): void {
    console.log(arg.event.id);
    const indexEvent = _.findIndex(this.calendarEvents, { id: arg.event.id });
    this.calendarEvents[indexEvent].end = arg.event.end;
    this.calendarEvents[indexEvent].start = arg.event.start;
    this.calendarOptions.events = this.calendarEvents;
  }

  updateEvents(): void {

  }

  windowResize(info: ViewContentArg): void {
    const contentApi = info.view.calendar;
    if (window.innerWidth < 800) {
      contentApi.changeView('timeGridDay');
    } else {
      contentApi.changeView('timeGridWeek');
    }
  }

  reshapeAppointmentCalendar(idPatient: number, nomPatient: string, prenomPatient: string, idConsultation: number,
    dateConsultation: Date, idPraticien: number, idTypeConsult: number): any {
    const endDateConsultation = new Date(dateConsultation);
    endDateConsultation.setMinutes(dateConsultation.getMinutes() + 30);
    return {
      id: idConsultation,
      title: nomPatient + ' ' + prenomPatient,
      idPatient: +idPatient,
      idPraticien: +idPraticien,
      idTypeConsult: +idTypeConsult,
      start: dateConsultation,
      end: endDateConsultation,
      backgroundColor: '#378006',
      borderColor: '#378006',
    }
  }
}
