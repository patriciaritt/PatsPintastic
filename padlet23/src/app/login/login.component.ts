import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

interface Response {
  access_token : string
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private authService: AuthenticationService)
  {
    this.loginForm = this.fb.group({});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe((res: any) => {
        console.log(res);
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl("/padlets");  //schick erm damit auf die home seite
      });
    }
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    return this.authService.logout();
  }
}
