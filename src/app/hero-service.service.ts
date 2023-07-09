import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs'; // Observable is one of the key classes in the RxJS library  
import { MessageService } from './message.service'; // The HeroService gets hero data with the RxJS of() function 
import { HttpClient, HttpHeaders } from '@angular/common/http'; // HttpClient is Angular's mechanism for communicating with a remote server over HTTP
import { catchError, map, tap } from 'rxjs/operators'; // The HeroService methods will tap into the flow of observable values and send a message (via log()) to the message area at the bottom of the page

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  private heroesUrl = 'api/heroes'; // URL to web api

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`; // The heroes web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)), // The tap() operator looks at the observable values, does something with those values, and passes them along. The tap() call back doesn't touch the values themselves
      catchError(this.handleError<Hero>(`getHero id=${id}`)) // The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error
    );
  }

  getHeroes(): Observable<Hero[]> { // getHeroes() method returns the mock heroes
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')), // The HeroService methods will tap into the flow of observable values and send a message (via log()) to the message area at the bottom of the page
          catchError(this.handleError<Hero[]>('getHeroes', [])) // The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error
      );
  }

  updateHero(hero: Hero): Observable<any> { // The HttpClient.put() method takes three parameters: the URL, the data to update (the modified hero in this case), options
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)), // The tap() operator looks at the observable values, does something with those values, and passes them along. The tap() call back doesn't touch the values themselves
      catchError(this.handleError<any>('updateHero')) // The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error
    );
  }

  addHero(hero: Hero): Observable<Hero> { // The HttpClient.post() method takes three parameters: the URL, the data to add (the new hero in this case), options
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)), // The tap() operator looks at the observable values, does something with those values, and passes them along. The tap() call back doesn't touch the values themselves
      catchError(this.handleError<Hero>('addHero')) // The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> { // The HttpClient.delete() method takes three parameters: the URL, options
    const url = typeof hero === 'number' ? `${this.heroesUrl}/${hero}` : this.heroesUrl; // The URL is composed of the heroes resource URL plus the id of the hero to delete
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${hero}`)), // The tap() operator looks at the observable values, does something with those values, and passes them along. The tap() call back doesn't touch the values themselves
      catchError(this.handleError<Hero>('deleteHero')) // The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error
    );
  }

  searchHeroes(term:string): Observable<Hero[]> { // The HttpClient.delete() method takes three parameters: the URL, options
    if (!term.trim()) { // If there is no search term, return an empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe( // The URL is composed of the heroes resource URL plus the search term
      tap(x => x.length ? // The tap() operator looks at the observable values, does something with those values, and passes them along. The tap() call back doesn't touch the values themselves
        this.log(`found heroes matching "${term}"`) : // The tap() operator looks at the observable values, does something with those values, and passes them along. The tap() call back doesn't touch the values themselves
        this.log(`no heroes matching "${term}"`)), // The tap() operator looks at the observable values, does something with those values, and passes them along. The tap() call back doesn't touch the values themselves
      catchError(this.handleError<Hero[]>('searchHeroes', [])) // The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) { // The following handleError() will be shared by many HeroService methods so it's generalized to meet their different needs
    return (error:any): Observable<T> => {
      console.error(error); // TODO: send the error to remote logging infrastructure
      this.log(`${operation} failed: ${error.message}`); // TODO: better job of transforming error for user consumption
      return of(result as T); // Let the app keep running by returning an empty result
    };
  }

  httpOptions = { // The heroes web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
