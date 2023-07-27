import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Liquor } from '../shared/models/liquor.model';
import { LiquorService } from '../shared/services/liquor.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent  implements OnInit {
  liquors: Liquor[] = [];
  cart: Liquor[] = [];

  constructor(
    private liquorService: LiquorService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.getLiquors();
  }

  getLiquors() {
    this.liquors = this.liquorService.getLiquors();
  }

  addToCart(liquor: Liquor) {
    const existingItem = this.cart.find((item) => item.id = liquor.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...liquor, quantity: 1 });
    }
  }


  openCart() {
    this.presentCartModal();
  }

  async presentCartModal() {
    const modal = await this.modalController.create({
      component: 'cartModal', // ID of the cart modal in the template
    });
    return await modal.present();
  }

  closeCart() {
    this.modalController.dismiss();
  }

  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  calculateTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

}
