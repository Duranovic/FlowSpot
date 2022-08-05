// Angular and 3rd party modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { LatestSightingsComponent } from './latest-sightings/latest-sightings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'latest-sightings', component: LatestSightingsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'flowers', redirectTo: 'home', pathMatch: 'full'},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
