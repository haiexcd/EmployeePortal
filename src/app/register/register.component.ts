import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  
  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z ]+$')
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      ),
    ]),
  })

  get fullName(): FormControl {
    return this.form.get('fullName') as FormControl
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl
  }



  constructor() { }

  ngOnInit() {}

  register() {
    console.log(
      'fullName: ', this.form.controls['fullName'].value,
      'username: ', this.form.controls['username'].value,
      'email: ', this.form.controls['email'].value,
      'password: ', this.form.controls['password'].value,
    )
  }

}
