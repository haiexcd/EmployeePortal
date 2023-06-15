import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() {}

  register() {
    console.log('Registering user...');
    console.log('Full Name:', this.fullName);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

}
