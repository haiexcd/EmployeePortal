import { Injectable } from '@angular/core';
import { fakeLiquorData } from '../models/liquor-data';
import { Liquor } from '../models/liquor.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiquorService {
 

  constructor(private http: HttpClient) { }

  getLiquors(): Liquor[] {
    return fakeLiquorData
  }


}
