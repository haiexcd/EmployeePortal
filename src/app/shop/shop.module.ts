import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [ShopComponent],
  exports: [ShopComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    IonicModule,
  ]
})
export class ShopModule { }
