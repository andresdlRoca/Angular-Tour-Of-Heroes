import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http'; // The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses. Remove it when a real server is ready to receive requests.
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses. Remove it when a real server is ready to receive requests.
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component'; // The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses. Remove it when a real server is ready to receive requests.

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot( // The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses. Remove it when a real server is ready to receive requests.
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
