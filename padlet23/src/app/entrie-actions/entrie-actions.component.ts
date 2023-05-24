import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Entrie} from "../shared/entrie";
import {EntrieFactory} from "../shared/entrie-factory";
import {EntrieService} from "../shared/entrie.service";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../shared/user";
import {UserService} from "../shared/user-service";
import {EntrieActionsErrorMessages} from "./entrie-actions-error-messages";

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
  users: User[] = [];
  errors: {[key:string]:string} = {};
  constructor(
    private fb: FormBuilder,
    private es: EntrieService,
    private us: UserService,
    private route: ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService: AuthenticationService
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

    this.us.getAll().subscribe(
      res => this.users = res
    );

    this.initEntrie();
  }

  initEntrie(){
    this.entrieForm = this.fb.group({
      id: this.entrie.id,
      title: [this.entrie.title, Validators.required],
      content: this.entrie.content,
      image: [this.entrie.image, Validators.required]
    });
    this.entrieForm.statusChanges.subscribe(()=>{
      this.updateErrorMessage();
    })
  }

  updateErrorMessage(){
    this.errors = {};
    for(const message of EntrieActionsErrorMessages){
      const control = this.entrieForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
  deleteEntrie(){
    const params = this.route.snapshot.params;
    this.es.deleteEntrie(params['id'], params['entrie_id']).subscribe(
      (e:any) => {
        this.router.navigate(['../../'],
          {relativeTo: this.route});
      }
    )
  }

  submitForm(){
    const entrie: Entrie = EntrieFactory.fromObject(this.entrieForm.value);
    const params = this.route.snapshot.params;
    entrie.content = entrie.content ? entrie.content : `<p><i>Insert your own content... ✍️</i></p>`;

    if (this.isUpdateingEntrie) {
      this.es.updateEntrie(params['id'], entrie).subscribe(res => {
        this.router.navigate(["../../"], {
          relativeTo: this.route
        });
      });
    }
    else {
      entrie.user_id = parseInt(sessionStorage.getItem("userId") ?? '0', 10); //wenn ma mehr user hat
      this.es.createEntrie(params['id'], entrie).subscribe(res => {
        this.entrie = EntrieFactory.empty();
        this.entrieForm.reset(EntrieFactory.empty());
        this.router.navigate(["../../"], { relativeTo: this.route });
      });
    }
  }

  isCreator(entrieUserId:number) {
    const loggedInUserId = sessionStorage.getItem('userId');
    if(loggedInUserId){
      return entrieUserId === parseInt(loggedInUserId, 10);
    }
    return false;
  }

  hasEditRights(){
    const params = this.route.snapshot.params;
    const padlet_id = params['id'];
    if(padlet_id){
      const loggedInUserId = sessionStorage.getItem('userId');
      if(loggedInUserId){
        const user = this.users.find(user => user.id ===  parseInt(loggedInUserId,10));
        if (user) {
          const userRights = user.userrights;
          if(userRights){
            const hasEditRight = userRights.find(
              userright => userright.edit && userright.user_id === user.id && userright.padlet_id === parseInt(padlet_id)
            );
            return hasEditRight;
          }
        }
      }
    }
    return false;
  }

  hasDeleteRights(){
    const params = this.route.snapshot.params;
    const padlet_id = params['id'];
    if(padlet_id){
      const loggedInUserId = sessionStorage.getItem('userId');
      if(loggedInUserId){
        const user = this.users.find(user => user.id ===  parseInt(loggedInUserId,10));
        if (user) {
          const userRights = user.userrights;
          if(userRights){
            const hasDelteRight = userRights.find(
              userright => userright.remove && userright.user_id === user.id && userright.padlet_id === parseInt(padlet_id)
            );
            return hasDelteRight;
          }
        }
      }
    }
    return false;
  }
}
