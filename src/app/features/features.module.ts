import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LatestSightingsComponent } from './latest-sightings/latest-sightings.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CreateAccountComponent } from './create-account/create-account.component';


@NgModule({
  declarations: [
    HomeComponent,
    LatestSightingsComponent,
    FavoritesComponent,
    CreateAccountComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    MatDialogModule,
  ],
})
export class FeaturesModule { }
