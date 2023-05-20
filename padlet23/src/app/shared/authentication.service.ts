import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = 'http://padlet23.s2010456025.student.kwmhgb.at/api/auth';
  constructor(private http:HttpClient) { }

  login(email:String, password:String) {
    console.log(email);
    console.log(password);
    return this.http.post(`${this.api}/login`,
      {email:email, password:password});
  }

  logout()
  {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("logged out");
  }

  isLoggedIn()
  {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      console.log(jwt_decode(token));
      const decodedToken = jwt_decode(token) as Token;
      //datum generieren aus timestamp
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("token expired");
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
    //hier rollen von verschiedene user speichern und von dort wieder abfragen
    const decodedToken = jwt_decode(token) as Token;
    console.log(decodedToken);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  // isAdmin(){
  //   return this.isLoggedIn() &&
  //     sessionStorage.getItem('role') =='admin';
  // }
}
