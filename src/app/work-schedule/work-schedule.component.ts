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

  ngOnInit() {}

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
      eventClick: this.handleEventClick, // Set up the eventClick callback
    });

    this.calendarApi = calendar;
    calendar.render();
  }

  handleEventClick = (info: any) => {
    const event = info.event; // Get the clicked event object

    // Show a confirmation dialog or other UI to allow editing/deleting the event
    // You can choose to open a modal, display a dialog, or any other desired UI

    // Example: Show a browser confirm dialog
    if (confirm('Do you want to edit or delete this shift?')) {
      this.editShift(event);
    } else {
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

    // Add the new shift to the events array
    this.calendarEvents.push(newShift);
    this.calendarApi.addEvent(newShift);

    // Clear the form fields
    this.shiftTitle = '';
    this.shiftName = '';
    this.shiftStartDate = '';
    this.shiftEndDate = '';
  }

  editShift(event: any) {
    // Find the index of the event in the events array
    const index = this.calendarEvents.findIndex((e) => e === event);

    if (index > -1) {
      const calendarEvent = this.calendarApi.getEventById(event.id);

      if (calendarEvent) {
        // Update the event's title and name
        this.calendarEvents[index].title = event.title;
        this.calendarEvents[index].extendedProps.name = event.extendedProps.name;

        // Update the event on the calendar
        calendarEvent.setProp('title', event.title);
        calendarEvent.setExtendedProp('name', event.extendedProps.name);
      }
    }
  }

  deleteShift(event: any) {
    // Find the index of the event in the events array
    const index = this.calendarEvents.findIndex((e) => e === event);
  
    if (index > -1) {
      // Remove the event from the events array
      this.calendarEvents.splice(index, 1);
  
      // Remove the event from the calendar
      const calendarEvent = this.calendarApi.getEventById(event.id);
      if (calendarEvent) {
        calendarEvent.remove();
      }
    }
  }
  
}
