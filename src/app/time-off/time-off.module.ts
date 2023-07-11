import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeOffRoutingModule } from './time-off-routing.module';
import { TimeOffComponent } from './time-off.component';


@NgModule({
  declarations: [TimeOffComponent],
  exports: [TimeOffComponent],
  imports: [
    CommonModule,
    TimeOffRoutingModule
  ]
})
export class TimeOffModule { }
