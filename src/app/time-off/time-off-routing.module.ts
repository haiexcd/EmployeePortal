import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeOffComponent } from './time-off.component';

const routes: Routes = [
  {
    path: '',
    component: TimeOffComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeOffRoutingModule { }
