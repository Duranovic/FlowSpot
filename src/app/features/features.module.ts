// Angular and 3rd party modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Custom defined modules
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { HomeComponent } from './home/home.component';
import { LatestSightingsComponent } from './latest-sightings/latest-sightings.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    LatestSightingsComponent,
    FavoritesComponent,
    CreateAccountComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class FeaturesModule { }
