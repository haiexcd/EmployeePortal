import { Injectable } from '@angular/core';
import { fakeLiquorData } from '../models/liquor-data';
import { Liquor } from '../models/liquor.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiquorService {
  private liquorData: Liquor[] = [];
  private liquorDataSubject = new BehaviorSubject<Liquor[]>(this.liquorData);

  constructor() {
    this.liquorData = [...fakeLiquorData];
    this.liquorDataSubject.next(this.liquorData);
   }

  getLiquors(): Liquor[] {
    return this.liquorData;
  }

  addLiquor(newLiquor: Liquor) {
    // Generate a unique ID for the new item
    const newId = this.liquorData.length + 1;
    newLiquor.id = newId;

    // Add the new item to the array
    this.liquorData.push(newLiquor);

    // Emit the updated data to all subscribers
    this.liquorDataSubject.next(this.liquorData);
  }
}
