import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroServiceService } from '../hero-service.service';
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero); // subscribe() method passes the emitted array to the callback, which sets the component's heroes property. 
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  @Input() hero?: Hero;
  constructor(
    private route: ActivatedRoute, // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. This component is interested in the route's bag of parameters extracted from the URL. The "id" parameter is the id of the hero to display.  
    private heroService: HeroServiceService, // The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display.  
    private location: Location // The location is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.  
  ) { }
}
