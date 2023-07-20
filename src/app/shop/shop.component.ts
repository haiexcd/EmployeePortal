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

  constructor(private liquorService: LiquorService) { }

  ngOnInit() {
    this.getLiquors();
  }

  getLiquors() {
    this.liquors = this.liquorService.getLiquors();
  }

}
