import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { IonicModule } from '@ionic/angular';
import { CartPanelComponent } from './cart-panel/cart-panel.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [ShopComponent, CartPanelComponent],
  exports: [ShopComponent, CartPanelComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class ShopModule { }
