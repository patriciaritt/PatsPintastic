import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Entrie} from "../shared/entrie";
import {EntrieFactory} from "../shared/entrie-factory";
import {EntrieService} from "../shared/entrie.service";

@Component({
  selector: 'bs-entrie-actions',
  templateUrl: './entrie-actions.component.html',
  styles: [
  ]
})
export class EntrieActionsComponent implements OnInit{

  entrie: Entrie = EntrieFactory.empty();
  entrieForm: FormGroup;
  isUpdateingEntrie = false;
  constructor(
    private fb: FormBuilder,
    private es: EntrieService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.entrieForm = this.fb.group({});
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if(params['entrie_id'] >= 1){
      this.isUpdateingEntrie = true;
      this.es.getEntrie(params['id'], params['entrie_id']).subscribe(
        (e:Entrie) => {
          this.entrie = e;
          this.initEntrie();
        });
    }
    this.initEntrie();
  }

  initEntrie(){
    this.entrieForm = this.fb.group({
      id: this.entrie.id,
      title: this.entrie.title,
      content: this.entrie.content
    });
  }
  deleteEntrie(){
    const params = this.route.snapshot.params;
    this.es.deleteEntrie(params['id'], params['entrie_id']).subscribe(
      (e:any) => {
        this.router.navigate(['../'],
          {relativeTo: this.route});
      }
    )
  }

  submitForm(){
    const entrie: Entrie = EntrieFactory.fromObject(this.entrieForm.value);
    const params = this.route.snapshot.params;

    if (this.isUpdateingEntrie) {
      this.es.updateEntrie(params['id'], entrie).subscribe(res => {
        this.router.navigate(["../"], {
          relativeTo: this.route
        });
      });
    }
    else {
      entrie.user_id = 1; // just for testing
      const params = this.route.snapshot.params;
      //entrie.user_id = sessionStorage.getItem("userId"); //wenn ma mehr user hat
      this.es.createEntrie(params['id'], entrie).subscribe(res => {
        this.entrie = EntrieFactory.empty();
        this.entrieForm.reset(EntrieFactory.empty());
        this.router.navigate(["../"], { relativeTo: this.route });
      });
    }
  }
}
