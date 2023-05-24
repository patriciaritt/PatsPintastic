import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Userright} from "./userright";

@Injectable({
  providedIn: 'root'
})
export class UserrightService {
  private api = 'http://padlet23.s2010456025.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {
  }

  createUserright(userright:Userright):Observable<any>
  {
    return this.http.post(`${this.api}/userrights`, userright)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteUserRight(padlet_id:number, user_id:number):Observable<any>{
    return this.http.delete(`${this.api}/userrights/${padlet_id}/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error:Error | any):Observable<any>
  {
    return throwError(error);
  }
}
