import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { v4 as uuidv4 } from 'uuid';


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

  constructor() { }

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
      dayCellDidMount: this.attachDayClickEventListeners,
    });

    this.calendarApi = calendar;
    calendar.render();
  }

  attachDayClickEventListeners = (arg: any) => {
    const cellEl = arg.el;
    const selectedDate = cellEl.getAttribute('data-date');

    cellEl.addEventListener('click', () => {
      // Prompt the user to add a shift
      const shiftTitle = prompt(`Enter shift title for ${selectedDate}:`);
      if (shiftTitle) {
        const newShift = {
          id: uuidv4(),
          title: shiftTitle,
          extendedProps: {
            name: '', // You can add additional properties here
          },
          start: selectedDate,
          end: selectedDate,
        };

        this.calendarEvents.push(newShift);
        this.calendarApi.addEvent(newShift);

        // Save shift data to local storage
        localStorage.setItem('calendarEvents', JSON.stringify(this.calendarEvents));
      }
    });
  };


  handleEventClick = (info: any) => {
    const event = info.event;
    if (confirm('Do you want to delete this shift?')) {
      this.deleteShift(event);
    }
  };

  createShift() {
    const newShift = {
      id: uuidv4(),
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
    const index = this.calendarEvents.findIndex((e) => e.id === event.id);

  
    if (index > -1) {
      this.calendarEvents.splice(index, 1);
  
      const calendarEvent = this.calendarApi.getEventById(event.id);
      if (calendarEvent) {
        calendarEvent.remove();
      }
  
      // Save shift data to local storage
      localStorage.setItem('calendarEvents', JSON.stringify(this.calendarEvents));
  

    }
  }

  clearFormFields() {
    this.shiftTitle = '';
    this.shiftName = '';
    this.shiftStartDate = '';
    this.shiftEndDate = '';
  }

}
