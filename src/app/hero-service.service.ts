import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs'; // Observable is one of the key classes in the RxJS library  
import { MessageService } from './message.service'; // The HeroService gets hero data with the RxJS of() function 

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  getHeroes(): Observable<Hero[]> { // getHeroes() method returns the mock heroes
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  constructor(private messageService: MessageService) { }
}
