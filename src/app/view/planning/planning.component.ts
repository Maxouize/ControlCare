import { Patient, getPatientList } from './../../core/models/Patient';
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

  constructor(public dialog: MatDialog) {
    const name = Calendar.name;
  }

  ngOnInit(): void {
    this.patientList = getPatientList;
    this.initCalendarOptions();
    this.initBusinessHours();
    this.initCalendarEvents();
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
      eventDragStop: this.handleEventDragStop.bind(this),
      eventResize: this.handleEventDragStop.bind(this),
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
    const firstPatient = this.patientList[0];
    this.calendarEvents = [
      {
        id: '1',
        title: firstPatient.nomPatient + ' ' + firstPatient.prenomPatient,
        idPatient: firstPatient.idPatient,
        start: new Date().setHours(9),
        end: new Date().setHours(11),
        backgroundColor: '#378006',
        borderColor: '#378006'
      }
    ];
    this.calendarOptions.events = this.calendarEvents;
  }

  handleDateSelect(arg): void {
    console.log(arg);
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px',
      data: {
        title: 'Prise de rendez-vous', aptStart: arg.start, aptEnd: arg.end, titleAction: 'Enregistrer',
        patientList: this.patientList
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const max = +_.maxBy(_.map(this.calendarEvents, _.property('id'))) + 1;
        const patient = _.find(this.patientList, { idPatient: +result.idPatient }) as Patient;
        console.log(max);
        this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
          id: max.toString(),
          title: patient.nomPatient + ' ' + patient.prenomPatient,
          start: result.startDate,
          end: result.endDate,
          idPatient: patient.idPatient
        });
        this.calendarOptions.events = this.calendarEvents;
      }
    });
  }

  handleEventClick(arg): void {
    console.log(arg);
    const patient = _.find(this.patientList, { idPatient: +arg.event.extendedProps.idPatient }) as Patient;
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px',
      data: {
        title: 'Rendez-vous de ' + patient.nomPatient + ' ' + patient.prenomPatient,
        aptStart: arg.event.start, aptEnd: arg.event.end, titleAction: 'Modifier', patientList: this.patientList,
        selectedPatient: patient.idPatient, idEvent: arg.event.id
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
}
