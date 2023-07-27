import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Liquor } from '../shared/models/liquor.model';
import { LiquorService } from '../shared/services/liquor.service';
import { CartPanelService } from './cart-panel.service';
import { CartPanelComponent } from './cart-panel/cart-panel.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent  implements OnInit {
  liquors: Liquor[] = [];
  cart: Liquor[] = [];
  searchQuery: string = '';
  filteredLiquors: Liquor[] = [];



  constructor(
    private liquorService: LiquorService,
    private modalController: ModalController,
    private cartPanelService: CartPanelService
    ) { }

  ngOnInit() {
    this.getLiquors();
    this.cartPanelService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  getLiquors() {
    this.liquors = this.liquorService.getLiquors();
    this.filteredLiquors = this.liquors;
  }

 
  addToCart(liquor: Liquor) {
    this.cartPanelService.addToCart(liquor);
  }

  openCart() {
    this.presentCartPanel();
  }

  async presentCartPanel() {
    const modal = await this.modalController.create({
      component: CartPanelComponent,
      cssClass: 'cart-panel-modal',
    });

    modal.present();
  }



  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  calculateTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  filterLiquors() {
    this.filteredLiquors = this.liquors.filter((liquor) =>
      liquor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}
