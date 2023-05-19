import { Component, OnInit } from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];
  constructor(private bs:PadletService) {
  }
  ngOnInit() {
    this.bs.getAll().subscribe(
      res => this.padlets = res
    );
  }
}
