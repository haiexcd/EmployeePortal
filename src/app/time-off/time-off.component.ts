import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-time-off',
  templateUrl: './time-off.component.html',
  styleUrls: ['./time-off.component.scss'],
})
export class TimeOffComponent  implements OnInit {
  name!: string;
  startDate!: string;
  endDate!: string;
  reason!: string;
  leaveRequests: any[] = [];
  showLeaveRequests: boolean = false;


  constructor(private navCtrl: NavController) { }

  submitLeaveRequest() {
    // Create a unique ID for the leave request
    const requestId = this.generateRequestId();

    // Create an object with the leave request details
    const leaveRequest = {
      id: requestId,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      reason: this.reason
    };

    // Log the leave request details to the console
    console.log('Leave Request:', leaveRequest);

    // Add the new leave request to the leaveRequests array
    this.leaveRequests.push(leaveRequest);

    // After submission, navigate back to the previous page or any other desired page
    // this.navCtrl.back();

    // Clear the form fields
    this.clearFormFields();
  }

  toggleLeaveRequests() {
    this.showLeaveRequests = !this.showLeaveRequests;
  }

  private generateRequestId() {
    // Generate a unique ID for the leave request
    // You can use any UUID generation method or a simple timestamp-based ID generation logic
    // Here, we are using a simple timestamp-based approach
    return Date.now().toString();
  }

  private clearFormFields() {
    this.name = '';
    this.startDate = '';
    this.endDate = '';
    this.reason = '';
  }

  ngOnInit() {}

}