import {Component, Input, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {AuthenticationService} from "../shared/authentication.service";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent implements OnInit{

  userRights: { [key: number]: { user_id: number; padlet_id: number; read: number; write: number; edit: number } } = [];
 @Input() padlet : Padlet | undefined;

  constructor(
    public authService: AuthenticationService,
    private ps: PadletService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const uid = sessionStorage.getItem("userId");
    if(uid){
      this.ps.getCurrentUserRights(parseInt(uid)).subscribe(
        userRights => {
          this.userRights = userRights;
        }
      );
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
      const uid = sessionStorage.getItem("userId");
      if(uid){
        //checken, ob der user beim ausgegebenen padlet item edit rechte hat
        // console.log(this.userRights[0]['edit']);
        // console.log(this.userRights[1]['edit']);
        return true;
      }
      return false;
    }
    return false;
  }
}
