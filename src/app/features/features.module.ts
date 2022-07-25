import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LatestSightingsComponent } from './latest-sightings/latest-sightings.component';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    HomeComponent,
    LatestSightingsComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
  ],
})
export class FeaturesModule { }
