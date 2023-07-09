import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroServiceService } from '../hero-service.service';
import { MessageService } from '../message.service'; 


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements  OnInit{
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); // subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  }

  heroes: Hero[] = [];
  ngOnInit() {
    this.getHeroes();
  }

  add(name: string, superpower: string ):void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name, superpower } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      }
    );
  }

  delete(hero:Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  
  constructor(private heroService: HeroServiceService) { }
}
