import { Component } from '@angular/core';
import {Entrie, Rating} from "../shared/entrie";
import {EntrieFactory} from "../shared/entrie-factory";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EntrieService} from "../shared/entrie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {RatingFactory} from "../shared/rating-factory";

@Component({
  selector: 'bs-comments-ratings',
  templateUrl: './comments-ratings.component.html',
  styles: [
  ]
})
export class CommentsRatingsComponent {
  entrie: Entrie = EntrieFactory.empty();
  commentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private es: EntrieService,
    private route: ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService: AuthenticationService
  ) {
    this.commentForm = this.fb.group({});
  }
  ngOnInit() {
    const params = this.route.snapshot.params;
    if(params['entrie_id'] >= 1){
      this.es.getEntrie(params['id'], params['entrie_id']).subscribe(
        (e:Entrie) => {
          this.entrie = e;
          this.initEntrie();
        });
    }
    this.initEntrie();
  }

  initEntrie(){
    this.commentForm = this.fb.group({
      comment: ''
    });
  }

  likeEntrie(){
    console.log(this.commentForm.value);
    const rating: Rating = RatingFactory.fromObject(this.commentForm.value);
    const params = this.route.snapshot.params;
    rating.rating = 15;

    this.es.likeEntrie(params['id'], params['entrie_id'], rating).subscribe(res => {
      this.router.navigate(["../../../padlets/"+ params['id'] +"/entrie/" + params['entrie_id']], {
        relativeTo: this.route
      });
    });
  }
  commentEntrie(){
  //   const entrie: Entrie = EntrieFactory.fromObject(this.entrieForm.value);
  //   const params = this.route.snapshot.params;
  //
  //   if (this.isUpdateingEntrie) {
  //     this.es.updateEntrie(params['id'], entrie).subscribe(res => {
  //       this.router.navigate(["../../"], {
  //         relativeTo: this.route
  //       });
  //     });
  //   }
  //   else {
  //     //entrie.user_id = 1; // just for testing
  //     const params = this.route.snapshot.params;
  //     entrie.user_id = parseInt(sessionStorage.getItem("userId") ?? '0', 10); //wenn ma mehr user hat
  //     this.es.createEntrie(params['id'], entrie).subscribe(res => {
  //       this.entrie = EntrieFactory.empty();
  //       this.entrieForm.reset(EntrieFactory.empty());
  //       this.router.navigate(["../../"], { relativeTo: this.route });
  //     });
  //   }
  }
}
