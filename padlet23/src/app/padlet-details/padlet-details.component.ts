import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entrie} from "../shared/entrie";
import {EntrieService} from "../shared/entrie.service";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent implements OnInit{
  entries: Entrie[] = [];
  constructor(
    private ps: PadletService,
    private es: EntrieService,
    private route: ActivatedRoute,
    private router:Router
  ) { }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getAllEntries(params['id']).subscribe(
      (res) => this.entries = res
    );
  }
}
