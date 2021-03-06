/**
 * Created by mchomont on 10/01/2018.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from '../../model/user';
import {MessageService} from './message.service';
import {Configuration} from '../../app.constants';
import {AlertService} from '../alert.service';
import {Cat} from '../../model/cat';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

  private userUrl;  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private configuration: Configuration,
              private alertService: AlertService) {
    this.userUrl = this.configuration.ServerWithApiUrl + 'users';
  }

  /** GET heroes from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET user by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.userUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(u => {
          const outcome = u ? `fetched` : `did not find`;
          this.log(`${outcome} user id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.userUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  //////// Save methods //////////
  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    let body = new URLSearchParams();
    body.set('name', user.name);
    body.set('firstName', user.firstName);
    body.set('age', user.age.toString());
    body.set('address', user.address);
    body.set('postalCode', user.postalCode);
    body.set('city', user.city);
    body.set('password', user.password);
    body.set('mail', user.mail);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<User>(this.userUrl, body.toString(), options).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.name}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl, user, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      this.alertService.error(error);
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UserService: ' + message);
  }
}
