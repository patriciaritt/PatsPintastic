import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletService} from "../shared/padlet.service";
import {Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {UserService} from "../shared/user-service";
import {User, Userright} from "../shared/user";
import {PadletActionsErrorMessages} from "./padlet-actions-error-messages";
import {UserrightFactory} from "../shared/userright-factory";
import {UserrightService} from "../shared/userright.service";

@Component({
  selector: 'bs-padlet-actions',
  templateUrl: './padlet-actions.component.html',
  styles: [
  ]
})
export class PadletActionsComponent implements OnInit{
  users: User[] = [];
  userright: Userright = UserrightFactory.empty();
  padlet: Padlet = PadletFactory.empty();
  padletForm: FormGroup;
  userrightForm: FormGroup;
  isUpdateingPadlet = false;
  errors: {[key:string]:string} = {};
  showAlert: boolean = false;
  constructor(
    private fb: FormBuilder,
    private ps: PadletService,
    private us: UserService,
    private usright: UserrightService,
    private route: ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService: AuthenticationService
  ) {
    this.padletForm = this.fb.group({});
    this.userrightForm = this.fb.group({});
  }
  ngOnInit() {
    const params = this.route.snapshot.params;
    if(params['id'] >= 1){
      this.isUpdateingPadlet = true;
      this.ps.getPadlet(params['id']).subscribe(
        (p:Padlet) => {
          this.padlet = p;
          this.initPadlet();
        });
    }
    this.initPadlet();

    this.us.getAll().subscribe(
      res => this.users = res
    );
  }

  initPadlet(){
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
      user_id: this.padlet.user_id,
      is_public: this.padlet.is_public,
      image: [this.padlet.image, Validators.required]
    });
    this.padletForm.statusChanges.subscribe(()=>{
      this.updateErrorMessage();
    })

    this.userrightForm = this.fb.group({
      id: this.userright.id,
      padlet_id: this.userright.padlet_id,
      user_id: '',
      read: this.userright.read,
      write: this.userright.write,
      edit: this.userright.edit,
      remove: this.userright.remove
    })
  }

  updateErrorMessage(){
    this.errors = {};
    for(const message of PadletActionsErrorMessages){
      const control = this.padletForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
  deletePadlet(){
    const params = this.route.snapshot.params;
    this.ps.deletePadlet(params['id']).subscribe(
      (e:any) => {
        this.router.navigate(['../../'],
          {relativeTo: this.route});
      }
    )
  }

  submitForm(){
    const padlet: Padlet = PadletFactory.fromObject(this.padletForm.value);
    const params = this.route.snapshot.params;

    if (this.isUpdateingPadlet) {
      this.ps.updatePadlet(params['id'], padlet).subscribe(res => {
        this.router.navigate(["../../"], {
          relativeTo: this.route
        });
      });
    }
    else {
      padlet.user_id = parseInt(sessionStorage.getItem("userId") ?? '0', 10); //wenn ma mehr user hat
      this.ps.createPadlet(padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../../"], { relativeTo: this.route });
      });
    }
  }

  inviteUser(padlet_id:any){
    const userright: Userright = UserrightFactory.fromObject(this.userrightForm.value);
    const email = userright.user_id.toString();
    const user = this.users.find(user => user.email === email);

    if(user){
      userright.padlet_id = parseInt(padlet_id);
      userright.user_id = user.id
      userright.read = true;

      if(userright.edit){
        userright.write = true;
      }

      if(userright.remove){
        userright.write = true;
        userright.edit = true;
      }

      this.usright.deleteUserRight(padlet_id, user.id).subscribe((e:any)=>{});
      this.usright.createUserright(userright).subscribe(res => {
        this.userright = UserrightFactory.empty();
        //this.userrightForm.reset(UserrightFactory.empty());
        this.showAlert = true;
      });
    }
    else {
      alert("this user does not exist");
    }
  }

  isCreator() {
    const loggedInUserId = sessionStorage.getItem('userId');
    if(loggedInUserId){
      return this.padlet?.user_id === parseInt(loggedInUserId, 10);
    }
    return false;
  }

  hasEditRights(padlet_id:any){
    if(padlet_id){
      const loggedInUserId = sessionStorage.getItem('userId');
      if(loggedInUserId){
        const user = this.users.find(user => user.id ===  parseInt(loggedInUserId,10));
        if (user) {
          const userRights = user.userrights;
          if(userRights){
            const hasEditRight = userRights.some(right => right.padlet_id === padlet_id && right.edit);
            return hasEditRight;
          }
        }
      }
    }
    return false;
  }

  hasDeleteRights(padlet_id:any){
    if(padlet_id){
      const loggedInUserId = sessionStorage.getItem('userId');
      if(loggedInUserId){
        const user = this.users.find(user => user.id ===  parseInt(loggedInUserId,10));
        if (user) {
          const userRights = user.userrights;
          if(userRights){
            const hasDeleteRight = userRights.some(right => right.padlet_id === padlet_id && right.remove);
            return hasDeleteRight;
          }
        }
      }
    }
    return false;
  }
}
