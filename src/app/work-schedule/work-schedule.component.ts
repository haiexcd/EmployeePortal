import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AlertController } from '@ionic/angular';
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

  constructor(private alertController: AlertController) { }

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
  
    cellEl.addEventListener('click', async () => {
      const alert = await this.alertController.create({
        header: `Enter shift title for ${selectedDate}:`,
        inputs: [
          {
            name: 'shiftTitle',
            type: 'text',
            placeholder: 'Shift Title'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              // User clicked "Cancel" or closed the pop-up
            }
          },
          {
            text: 'Add',
            handler: (data) => {
              const shiftTitle = data.shiftTitle;
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
            }
          }
        ]
      });
  
      await alert.present();
    });
  };
  


  handleEventClick = async (info: any) => {
    const event = info.event;
  
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Do you want to delete this shift?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // User clicked "No" or closed the pop-up
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteShift(event);
          }
        }
      ]
    });
  
    await alert.present();
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
    console.log(index)

    if (index > -1) {
      const calendarEvent = this.calendarApi.getEventById(event.id);
      console.log(calendarEvent)

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
