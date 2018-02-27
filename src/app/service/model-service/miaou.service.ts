/**
 * Created by mchomont on 10/01/2018.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Miaou } from '../../model/miaou';
import { MessageService } from './message.service';
import {Configuration} from "../../app.constants";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MiaouService {

  private miaouUrl;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private configuration: Configuration) {
    this.miaouUrl = this.configuration.ServerWithApiUrl+"meows";
  }

  /** GET miaous from the server */
  getMiaous (): Observable<Miaou[]> {
    return this.http.get<Miaou[]>(this.miaouUrl)
      .pipe(
        tap(miaous => this.log(`fetched miaous`)),
        catchError(this.handleError('getMiaous', []))
      );
  }

  /** GET miaou by id. Return `undefined` when id not found */
  getMiaouNo404<Data>(id: number): Observable<Miaou> {
    const url = `${this.miaouUrl}/?id=${id}`;
    return this.http.get<Miaou[]>(url)
      .pipe(
        map(miaous => miaous[0]), // returns a {0|1} element array
        tap(u => {
          const outcome = u ? `fetched` : `did not find`;
          this.log(`${outcome} miaou id=${id}`);
        }),
        catchError(this.handleError<Miaou>(`getMiaou id=${id}`))
      );
  }

  /** GET miaou by id. Will 404 if id not found */
  getMiaou(id: number): Observable<Miaou> {
    const url = `${this.miaouUrl}/${id}`;
    return this.http.get<Miaou>(url).pipe(
      tap(_ => this.log(`fetched miaou id=${id}`)),
      catchError(this.handleError<Miaou>(`getMiaou id=${id}`))
    );
  }

  /* GET miaous whose name contains search term */
  searchMiaous(term: string): Observable<Miaou[]> {
    if (!term.trim()) {
      // if not search term, return empty miaou array.
      return of([]);
    }
    return this.http.get<Miaou[]>(`${this.miaouUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found miaous matching "${term}"`)),
      catchError(this.handleError<Miaou[]>('searchMiaous', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new miaou to the server */
  addMiaou (miaou: Miaou): Observable<Miaou> {
    return this.http.post<Miaou>(this.miaouUrl, miaou, httpOptions).pipe(
      tap((miaou: Miaou) => this.log(`added miaou w/ id=${miaou.id}`)),
      catchError(this.handleError<Miaou>('addMiaou'))
    );
  }

  /** DELETE: delete the miaou from the server */
  deleteMiaou (miaou: Miaou | number): Observable<Miaou> {
    const id = typeof miaou === 'number' ? miaou : miaou.id;
    const url = `${this.miaouUrl}/${id}`;

    return this.http.delete<Miaou>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted miaou id=${id}`)),
      catchError(this.handleError<Miaou>('deleteMiaou'))
    );
  }

  /** PUT: update the miaou on the server */
  updateMiaou (miaou: Miaou): Observable<any> {
    return this.http.put(this.miaouUrl, miaou, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${miaou.id}`)),
      catchError(this.handleError<any>('updateMiaou'))
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

      // TODO: better job of transforming error for miaou consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('MiaouService: ' + message);
  }
}
