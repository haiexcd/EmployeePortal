import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Liquor } from '../shared/models/liquor.model';

@Injectable({
  providedIn: 'root'
})
export class CartPanelService {
  private cart: BehaviorSubject<Liquor[]> = new BehaviorSubject<Liquor[]>([]);

  constructor() { }

  getCart(): Observable<Liquor[]> {
    return this.cart.asObservable();
  }

  addToCart(liquor: Liquor) {
    const currentCart = this.cart.getValue();
    const existingItem = currentCart.find((item) => item.id === liquor.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentCart.push({ ...liquor, quantity: 1 });
    }

    this.cart.next(currentCart);
  }

  clearCart() {
    this.cart.next([]);
  }

  updateCart(updatedCart: Liquor[]) {
    this.cart.next(updatedCart);
  }
}
