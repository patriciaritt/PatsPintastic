import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {Entrie, Rating} from "./entrie";
import {Comment} from "./comment";
@Injectable({
  providedIn: 'root'
})
export class EntrieService {
  private api = 'http://padlet23.s2010456025.student.kwmhgb.at/api';
  constructor(private http:HttpClient) {
  }

  getEntrie(padlet_id:number, id:number):Observable<Entrie>
  {
    return this.http.get<Entrie>(`${this.api}/padlets/${padlet_id}/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllRatings():Observable<Array<Rating>>
  {
    return this.http.get<Rating>(`${this.api}/ratings`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  deleteEntrie(padlet_id:number, entrie_id:number):Observable<any>
  {
    return this.http.delete(`${this.api}/padlets/${padlet_id}/${entrie_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateEntrie(padlet_id:number, entrie:Entrie):Observable<any>
  {
    return this.http.put(`${this.api}/padlets/${padlet_id}/${entrie.id}`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createEntrie(padlet_id:number, entrie:Entrie):Observable<any>
  {
    return this.http.post(`${this.api}/padlets/${padlet_id}`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  commentEntrie(entrie_id:number, comment:Comment):Observable<any>
  {
    return this.http.post(`${this.api}/commententrie/${entrie_id}`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  rateEntrie(entrie_id:number, rating:Rating):Observable<any>{
    return this.http.post(`${this.api}/rateentrie/${entrie_id}`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteEntrieRating(entrie_id:number, user_id:number):Observable<any>{
    return this.http.delete(`${this.api}/deleteratings/${entrie_id}/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any):Observable<any>
  {
    return throwError(error);
  }

}
