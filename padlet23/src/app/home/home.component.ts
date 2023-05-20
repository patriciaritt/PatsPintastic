import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    public authService: AuthenticationService) {

  }
  getLoginLabel(){
    if(this.authService.isLoggedIn()){
      return "Logout";
    }
    else
    {
      return "Login";
    }
  }
}
