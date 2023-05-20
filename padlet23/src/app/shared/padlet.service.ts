import { Injectable } from '@angular/core';
import {Padlet} from "./padlet";
import {Entrie} from "./entrie";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PadletService {
  private api = 'http://padlet23.s2010456025.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {
  }
  getAll():Observable<Array<Padlet>>
  {
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllEntries(id:number):Observable<Array<Entrie>>
  {
    return this.http.get<Array<Entrie>>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getPadlet(padlet_id:number):Observable<Padlet>
  {
    return this.http.get<Padlet>(`${this.api}/padlets/padlet/${padlet_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  deletePadlet(padlet_id:number):Observable<any>
  {
    return this.http.delete(`${this.api}/padlets/${padlet_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updatePadlet(padlet_id:number, padlet:Padlet):Observable<any>
  {
    return this.http.put(`${this.api}/padlets/${padlet_id}`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createPadlet(padlet:Padlet):Observable<any>
  {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error:Error | any):Observable<any>
  {
    return throwError(error);
  }
}
