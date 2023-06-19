import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
