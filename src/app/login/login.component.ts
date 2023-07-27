import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {


  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  ngOnInit() {}

  login(): void {
    console.log(
      'username: ', this.form.controls['username'].value,
      'password: ', this.form.controls['password'].value
    );
    this.authService.login(this.username.value, this.password.value)
    .subscribe(
      () => {
        const userRole = this.authService.getUserRole();
        if (userRole === 'admin') {
          this.router.navigate(['/home']);
        } else if (userRole === 'user') {
          this.router.navigate(['/shop']);
        } else {
          console.error('Invalid user role.');
        }
      },
      (error: any) => {
        console.error(error);
        
      }
    );
  }

}
