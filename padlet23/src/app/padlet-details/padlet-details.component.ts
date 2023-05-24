import {Component, OnInit} from '@angular/core';
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entrie} from "../shared/entrie";
import {Rating} from "../shared/rating";
import {EntrieService} from "../shared/entrie.service";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {Comment} from "../shared/comment";
import {UserService} from "../shared/user-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentFactory} from "../shared/comment-factory";
import {RatingFactory} from "../shared/rating-factory";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: []
})
export class PadletDetailsComponent implements OnInit{
  entries: Entrie[] = [];
  users: User[] = [];
  ratings: Rating[] = [];
  padletId: number = 0;
  rating: Rating = RatingFactory.empty();
  comment: Comment = CommentFactory.empty();
  commentForm: FormGroup;
  showAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ps: PadletService,
    private es: EntrieService,
    private us: UserService,
    private route: ActivatedRoute,
    private router:Router,
    public authService: AuthenticationService
  ) {
    this.commentForm = this.fb.group({});
  }
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

    this.es.getAllRatings().subscribe(
      res => this.ratings = res
    );

    this.initComment();
  }

  initComment(){
    this.commentForm = this.fb.group({
      id: this.comment.id,
      user_id: this.comment.user_id,
      entrie_id: this.comment.entrie_id,
      comment: this.comment.comment
    });
  }

  hasRatedEntrie(entrie_id:number){
    const userId = sessionStorage.getItem('userId');
    if(userId){
      const rating = this.ratings.find(rating => rating.entrie_id === entrie_id && rating.user_id === parseInt(userId));
      if(rating){
        return true;
      }
      return false;
    }
    return false;
  }

  rateEntrie(entrie_id:number){
    const loggedInUserId = sessionStorage.getItem('userId');
    if(loggedInUserId) {
      const rating: Rating = RatingFactory.fromObject(this.commentForm.value);
      rating.user_id = parseInt(loggedInUserId, 10);
      rating.entrie_id = entrie_id;
      rating.rating = 1;
      this.es.rateEntrie(entrie_id, rating).subscribe(res => {
        this.rating = RatingFactory.empty();
        window.location.reload();
      });
    }
  }

  deleteEntrieRating(entrie_id:number){
    const loggedInUserId = sessionStorage.getItem('userId');
    if(loggedInUserId){
      this.es.deleteEntrieRating(entrie_id, parseInt(loggedInUserId,10)).subscribe(
        (e:any)=>{
          window.location.reload();
        }
      )
    }
  }

  submitComment(entrie_id:number){
    const loggedInUserId = sessionStorage.getItem('userId');
    if(loggedInUserId){
      const comment: Comment = CommentFactory.fromObject(this.commentForm.value);
      comment.user_id = parseInt(loggedInUserId, 10);
      comment.entrie_id = entrie_id;
      this.es.commentEntrie(entrie_id, comment).subscribe(res => {
        this.comment = CommentFactory.empty();
        this.commentForm.reset(CommentFactory.empty());
        window.location.reload();
      });
    }
    else{
      this.showAlert = true;
    }
  }

  getUserNameByCommentUserId(userId:number){
    const user = this.users.find(user => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
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

  protected readonly sessionStorage = sessionStorage;
}
