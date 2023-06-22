import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.scss'],
})
export class WorkScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarEl!: ElementRef;
  shiftTitle!: string;
  shiftName!: string;
  shiftStartDate!: string;
  shiftEndDate!: string;
  calendarApi: any;
  calendarEvents: any[] = [];

  constructor() {}

  ngOnInit() {
    // Retrieve shift data from local storage if available
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      this.calendarEvents = JSON.parse(storedEvents);
    }
  }

  ngAfterViewInit() {
    const calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      events: this.calendarEvents,
      eventClick: this.handleEventClick,
    });

    this.calendarApi = calendar;
    calendar.render();
  }

  handleEventClick = (info: any) => {
    const event = info.event;
    if (confirm('Do you want to delete this shift?')) {
      this.deleteShift(event);
    } 
  };

  createShift() {
    const newShift = {
      title: this.shiftTitle,
      extendedProps: {
        name: this.shiftName,
      },
      start: this.shiftStartDate,
      end: this.shiftEndDate,
    };

    this.calendarEvents.push(newShift);
    this.calendarApi.addEvent(newShift);

    // Save shift data to local storage
    localStorage.setItem('calendarEvents', JSON.stringify(this.calendarEvents));

    this.clearFormFields();
  }

  editShift(event: any) {
    const index = this.calendarEvents.findIndex((e) => e === event);

    if (index > -1) {
      const calendarEvent = this.calendarApi.getEventById(event.id);

      if (calendarEvent) {
        this.calendarEvents[index].title = event.title;
        this.calendarEvents[index].extendedProps.name = event.extendedProps.name;

        calendarEvent.setProp('title', event.title);
        calendarEvent.setExtendedProp('name', event.extendedProps.name);

        // Save shift data to local storage
        localStorage.setItem('calendarEvents', JSON.stringify(this.calendarEvents));
      }
    }
  }

  deleteShift(event: any) {
    const index = this.calendarEvents.findIndex((e) => e === event);

    if (index > -1) {
      this.calendarEvents.splice(index, 1);

      const calendarEvent = this.calendarApi.getEventById(event.id);
      if (calendarEvent) {
        calendarEvent.remove();
      }

      // Save shift data to local storage
      localStorage.setItem('calendarEvents', JSON.stringify(this.calendarEvents));
    }
    localStorage.removeItem('calendarEvents');
    this.calendarEvents = [];
    this.calendarApi.removeAllEvents();
  }

  clearFormFields() {
    this.shiftTitle = '';
    this.shiftName = '';
    this.shiftStartDate = '';
    this.shiftEndDate = '';
  }

}
