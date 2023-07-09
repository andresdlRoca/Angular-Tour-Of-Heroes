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
  
  constructor(private heroService: HeroServiceService) { }
}
