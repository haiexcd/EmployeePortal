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
  selectedPaymentOption: string = 'cash'; // Default to 'cash'

  constructor(
    private modalController: ModalController,
    private cartPanelService: CartPanelService // Inject the CartPanelService
  ) {}

  ngOnInit() {
    this.cartPanelService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  calculateSubtotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateSalesTax() {
    const subtotal = this.calculateSubtotal();
    const salesTaxRate = 6.7 / 100;
    const salesTax = (subtotal + 7) * salesTaxRate;
    return Math.ceil(salesTax * 100) / 100; // Round to the nearest cent
  }

  calculateGrandTotal() {
    const subtotal = this.calculateSubtotal();
    const salesTax = this.calculateSalesTax();
    return subtotal + 7 + salesTax;
  }

  closeCart() {
    this.modalController.dismiss();
  }

  removeItem(item: Liquor) {
    // If the item has more than one quantity, remove one quantity
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      // If the item has only one quantity, remove the whole item from the cart
      this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
    }

    // Update the cart state using the service
    this.cartPanelService.updateCart(this.cart);
  }

  placeOrder() {
    // Your order logic here
    // For now, let's display a simple alert message
    const paymentMethod =
      this.selectedPaymentOption === 'cash' ? 'Cash' : 'Credit Card';
    const message = `Your order has been placed with ${paymentMethod} payment method.`;
    alert(message);
  }
}
