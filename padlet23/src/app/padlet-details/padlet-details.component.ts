import {Component, OnInit} from '@angular/core';
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute} from "@angular/router";
import {Entrie} from "../shared/entrie";
import {EntrieService} from "../shared/entrie.service";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {UserService} from "../shared/user-service";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent implements OnInit{
  entries: Entrie[] = [];
  users: User[] = [];
  padletId: number = 0;
  constructor(
    private ps: PadletService,
    private es: EntrieService,
    private us: UserService,
    private route: ActivatedRoute,
    public authService: AuthenticationService
  ) { }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.padletId = params['id'];
    this.ps.getAllEntries(params['id']).subscribe(
      (res) => {
        this.entries = res;
      }
    );
    this.us.getAll().subscribe(
      res => this.users = res
    );
  }

  likeEntrie(){

  }

  getUserNameByCommentUserId(userId:number){
    const user = this.users.find(user => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  }

  protected readonly sessionStorage = sessionStorage;
}
