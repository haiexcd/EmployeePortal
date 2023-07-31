import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InventoryComponent],
  exports: [InventoryComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class InventoryModule { }
