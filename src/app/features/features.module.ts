import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LatestSightingsComponent } from './latest-sightings/latest-sightings.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    LatestSightingsComponent,
    FavoritesComponent,
    CreateAccountComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class FeaturesModule { }
