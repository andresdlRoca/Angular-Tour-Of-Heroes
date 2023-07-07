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
  selectedHero?: Hero;
  ngOnInit() {
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero ${hero.name} with the id ${hero.id}`); // The onSelect() method assigns the clicked hero from the template to the component's selectedHero. 
  }
  
  constructor(private heroService: HeroServiceService, private messageService: MessageService) { }
}
