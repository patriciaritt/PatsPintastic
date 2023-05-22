import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://padlet23.s2010456025.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {
  }

  getAll():Observable<Array<User>>
  {
    return this.http.get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any):Observable<any>
  {
    return throwError(error);
  }
}
