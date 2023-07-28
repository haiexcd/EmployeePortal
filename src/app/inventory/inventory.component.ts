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

  isCameraAvailable: boolean; // Flag to indicate whether Camera plugin is available

  constructor(private camera: Camera, public liquorService: LiquorService) {
    this.isCameraAvailable = !!this.camera.getPicture; // Check if Camera plugin is available
  }

  ngOnInit() {}

  takePicture() {
    if (this.isCameraAvailable) {
      // Using Camera plugin
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
    } else {
      // Using computer's webcam (localhost)
      const constraints = {
        video: true,
      };

      navigator.mediaDevices.getUserMedia(constraints).then(
        (stream) => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d')!;
          
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            this.newLiquor.imageUrl = canvas.toDataURL('image/jpeg');
            stream.getTracks().forEach((track) => track.stop());
          };
        },
        (error) => {
          console.error('Error accessing webcam', error);
        }
      );
    }
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
