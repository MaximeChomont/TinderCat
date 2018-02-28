import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import {UserService} from "./model-service/user.service";
import {User} from "../model/user";


@Injectable()
export class AuthenticationService {
  users : User[];

  constructor(
    private http: HttpClient,
    private userService: UserService) {
      userService.getUsers().subscribe(users => this.users = users);
  }

  login(email: string, password: string) {
   /* return this.http.post<any>('/api/authenticate', { username: username, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
      */
    let returnValue = false;
   for( let user of this.users) {
      if(user.mail == email && user.password == password ) {
        localStorage.setItem('currentUser', user.id.toString());

        returnValue = true;
      }
    }

    return returnValue;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
