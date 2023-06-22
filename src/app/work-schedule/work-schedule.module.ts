import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkScheduleRoutingModule } from './work-schedule-routing.module';
import { WorkScheduleComponent } from './work-schedule.component';
import { IonicModule } from '@ionic/angular';

import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [WorkScheduleComponent],
  exports: [WorkScheduleComponent],
  imports: [
    CommonModule,
    WorkScheduleRoutingModule,
    IonicModule,
    FullCalendarModule,
    FormsModule,
  ],
  providers: []
})
export class WorkScheduleModule { }
