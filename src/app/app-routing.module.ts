import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'; // import the HeroesComponent so you can reference it in a Route.  
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // The default route redirects to the dashboard.
  { path: 'heroes', component: HeroesComponent }, // The colon (:) in the path indicates that :id is a placeholder for a specific hero id. 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, // The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
