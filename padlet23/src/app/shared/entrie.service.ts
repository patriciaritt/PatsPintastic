import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Entrie, Rating} from "./entrie";
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

  likeEntrie(padlet_id:number, entrie_id:number, rating:Rating):Observable<any>{
    return this.http.put(`${this.api}/comments/${padlet_id}/${entrie_id}`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any):Observable<any>
  {
    return throwError(error);
  }

}
