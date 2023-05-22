import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor(
    private router: Router,
    public authService: AuthenticationService)
  {
  }

  protected readonly sessionStorage = sessionStorage;
}
