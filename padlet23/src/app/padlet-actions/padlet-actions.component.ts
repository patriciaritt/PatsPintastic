import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletService} from "../shared/padlet.service";
import {Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-actions',
  templateUrl: './padlet-actions.component.html',
  styles: [
  ]
})
export class PadletActionsComponent implements OnInit{
  padlet: Padlet = PadletFactory.empty();
  padletForm: FormGroup;
  isUpdateingPadlet = false;
  constructor(
    private fb: FormBuilder,
    private ps: PadletService,
    private route: ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService: AuthenticationService
  ) {
    this.padletForm = this.fb.group({});
  }
  ngOnInit() {
    const params = this.route.snapshot.params;
    console.log(params);
    if(params['id'] >= 1){
      this.isUpdateingPadlet = true;
      this.ps.getPadlet(params['id']).subscribe(
        (p:Padlet) => {
          this.padlet = p;
          this.initPadlet();
        });
    }
    this.initPadlet();
  }

  initPadlet(){
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: this.padlet.name,
      user_id: this.padlet.user_id,
      is_public: this.padlet.is_public,
      image: this.padlet.image
    });
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
      //padlet.user_id = 1; // just for testing
      const params = this.route.snapshot.params;
      padlet.user_id = parseInt(sessionStorage.getItem("userId") ?? '0', 10); //wenn ma mehr user hat
      this.ps.createPadlet(padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../../"], { relativeTo: this.route });
      });
    }
  }
}
