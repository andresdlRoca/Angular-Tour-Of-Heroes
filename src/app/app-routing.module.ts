import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'; // import the HeroesComponent so you can reference it in a Route.  

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent } // The colon (:) in the path indicates that :id is a placeholder for a specific hero id. 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
