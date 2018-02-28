/**
 * Created by mchomont on 10/01/2018.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Cat } from '../../model/cat';
import { MessageService } from './message.service';
import {Configuration} from "../../app.constants";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CatService {

  private catUrl;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private configuration: Configuration) {
    this.catUrl = this.configuration.ServerWithApiUrl+"cats";
  }

  /** GET cats from the server */
  getCats (): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.catUrl)
      .pipe(
        tap(cats => this.log(`fetched cats`)),
        catchError(this.handleError('getCats', []))
      );
  }

  /** GET cat by id. Return `undefined` when id not found */
  getCatNo404<Data>(id: number): Observable<Cat> {
    const url = `${this.catUrl}/?id=${id}`;
    return this.http.get<Cat[]>(url)
      .pipe(
        map(cats => cats[0]), // returns a {0|1} element array
        tap(u => {
          const outcome = u ? `fetched` : `did not find`;
          this.log(`${outcome} cat id=${id}`);
        }),
        catchError(this.handleError<Cat>(`getCat id=${id}`))
      );
  }

  /** GET cat by id. Will 404 if id not found */
  getCat(id: number): Observable<Cat> {
    const url = `${this.catUrl}/${id}`;
    return this.http.get<Cat>(url).pipe(
      tap(_ => this.log(`fetched cat id=${id}`)),
      catchError(this.handleError<Cat>(`getCat id=${id}`))
    );
  }

  /* GET cats whose name contains search term */
  searchCats(term: string): Observable<Cat[]> {
    if (!term.trim()) {
      // if not search term, return empty cat array.
      return of([]);
    }
    return this.http.get<Cat[]>(`${this.catUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found cats matching "${term}"`)),
      catchError(this.handleError<Cat[]>('searchCats', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new cat to the server */
  addCat (cat: Cat): Observable<Cat> {
    let body = new URLSearchParams();
    body.set('name', cat.name);
    body.set('race', cat.race);
    body.set('age', cat.age.toString());
    body.set('gender', cat.gender);
    body.set('description', cat.description);
    body.set('idUser', cat.idUser.toString());
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<Cat>(this.catUrl,  body.toString(), options).pipe(
      tap((cat: Cat) => this.log(`added cat w/ id=${cat.id}`)),
      catchError(this.handleError<Cat>('addCat'))
    );
  }

  /** DELETE: delete the cat from the server */
  deleteCat (cat: Cat | number): Observable<Cat> {
    const id = typeof cat === 'number' ? cat : cat.id;
    const url = `${this.catUrl}/${id}`;

    return this.http.delete<Cat>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted cat id=${id}`)),
      catchError(this.handleError<Cat>('deleteCat'))
    );
  }

  /** PUT: update the cat on the server */
  updateCat (cat: Cat): Observable<any> {
    return this.http.put(this.catUrl, cat, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${cat.id}`)),
      catchError(this.handleError<any>('updateCat'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for cat consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CatService: ' + message);
  }
}
