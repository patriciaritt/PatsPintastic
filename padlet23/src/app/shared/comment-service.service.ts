import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Rating} from "./rating";

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private api = 'http://padlet23.s2010456025.student.kwmhgb.at/api';
  constructor(private http:HttpClient) {
  }

  private errorHandler(error:Error | any):Observable<any>
  {
    return throwError(error);
  }
}
