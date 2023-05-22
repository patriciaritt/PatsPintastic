import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    image:string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = 'http://padlet23.s2010456025.student.kwmhgb.at/api/auth';
  constructor(private http:HttpClient) { }

  login(email:String, password:String) {
    return this.http.post(`${this.api}/login`,
      {email:email, password:password});
  }

  logout()
  {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }

  isLoggedIn()
  {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        sessionStorage.removeItem("token");
        return false;
      }
      return true;
    }
    else
    {
      return false;
    }
  }

  setSessionStorage(token: string)
  {
    const decodedToken = jwt_decode(token) as Token;
    console.log(decodedToken);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
    sessionStorage.setItem("firstName", decodedToken.user.firstName);
    sessionStorage.setItem("lastName", decodedToken.user.lastName);
    sessionStorage.setItem("image", decodedToken.user.image);
  }
}
