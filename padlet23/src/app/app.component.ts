import { Component } from '@angular/core';
import {Padlet} from "./shared/padlet";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  // padlet : Padlet | undefined;
  //
  // constructor(private http: HttpClient){
  //   http.get<Padlet>('http://padlet23.s2010456025.student.kwmhgb.at')
  //     .subscribe(val => this.padlet = val);
  // }
}
