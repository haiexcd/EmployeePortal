import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeOffRoutingModule } from './time-off-routing.module';
import { TimeOffComponent } from './time-off.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TimeOffComponent],
  exports: [TimeOffComponent],
  imports: [
    CommonModule,
    TimeOffRoutingModule,
    IonicModule,
    FormsModule,
  ]
})
export class TimeOffModule { }
