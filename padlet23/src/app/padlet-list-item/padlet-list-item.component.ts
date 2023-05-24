import {Component, Input, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {AuthenticationService} from "../shared/authentication.service";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/user-service";
import {User} from "../shared/user";

@Component({
  selector: 'padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent implements OnInit{
  users: User[] = [];
 @Input() padlet : Padlet | undefined;

  constructor(
    public authService: AuthenticationService,
    private ps: PadletService,
    private us: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.us.getAll().subscribe(
      res => this.users = res
    );
  }
  isCreator() {
    const loggedInUserId = sessionStorage.getItem('userId');
    if(loggedInUserId){
      return this.padlet?.user_id === parseInt(loggedInUserId, 10);
    }
    return false;
  }

  getUserNameByPadletUserId(userId:any){
    userId = parseInt(userId, 10);
    const user = this.users.find(user => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
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

  hasReadingRights(padlet_id:any){
    if(padlet_id){
      const loggedInUserId = sessionStorage.getItem('userId');
      if(loggedInUserId){
        const user = this.users.find(user => user.id ===  parseInt(loggedInUserId,10));
        if (user) {
          const userRights = user.userrights;
          if(userRights){
            const hasReadingRight = userRights.some(right => right.padlet_id === padlet_id && right.read);
            return hasReadingRight;
          }
        }
      }
    }
    return false;
  }
}
