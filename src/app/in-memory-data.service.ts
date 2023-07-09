import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, superpower: 'Super Strength', name: 'Mr. Incredible', ranking: 50 },
      { id: 2, superpower: 'Super Speed', name: 'Dash', ranking: 40 },
      { id: 3, superpower: 'Invisibility', name: 'Violet', ranking: 30 },
      { id: 4, superpower: 'Elasticity', name: 'Elastigirl', ranking: 20 },
      { id: 5, superpower: 'One for All', name: 'All Might', ranking: 1 },
      { id: 6, superpower: 'Explosion', name: 'Bakugo', ranking: 10 },
      { id: 7, superpower: 'Half-Cold Half-Hot', name: 'Todoroki', ranking: 5 },
      { id: 8, superpower: 'Engine', name: 'Iida', ranking: 15 },
      { id: 9, superpower: 'Creation', name: 'Momo', ranking: 25 },
      { id: 10, superpower: 'Zero Gravity', name: 'Uraraka', ranking: 35 },
      { id: 11, superpower: 'Dark Shadow', name: 'Tokoyami', ranking: 5 }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}
