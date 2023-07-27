import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Liquor } from 'src/app/shared/models/liquor.model';
import { CartPanelService } from '../cart-panel.service';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss'],
})
export class CartPanelComponent  implements OnInit {
  cart: Liquor[] = [];

  constructor(
    private modalController: ModalController,
    private cartPanelService: CartPanelService // Inject the CartPanelService
  ) {}

  ngOnInit() {
    this.cartPanelService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  calculateTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  closeCart() {
    this.modalController.dismiss();
  }
}
