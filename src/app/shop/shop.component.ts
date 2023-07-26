import { Component, OnInit } from '@angular/core';
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

  constructor(private liquorService: LiquorService) { }

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

}
