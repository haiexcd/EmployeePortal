import { Component, OnInit } from '@angular/core';
import { Liquor } from '../shared/models/liquor.model';
import { LiquorService } from '../shared/services/liquor.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent  implements OnInit {
  newLiquor: Liquor = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    quantity: 0,
  };

  constructor(private camera: Camera, public liquorService: LiquorService) {}


  ngOnInit() {}


  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // Image data is in base64 format
        this.newLiquor.imageUrl = 'data:image/jpeg;base64,' + imageData;
      },
      (error) => {
        console.error('Error taking picture', error);
      }
    );
  }

  addNewLiquor() {
    this.liquorService.addLiquor(this.newLiquor);

    // Reset the form after adding the item
    this.newLiquor = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      quantity: 0,
    };
  }



}
