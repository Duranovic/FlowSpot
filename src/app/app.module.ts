import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { ViewsModule } from './views/views.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { entityConfig } from './entity-metadata';
import { HttpClientModule } from '@angular/common/http';
import { FlowersDataService } from './core/services/flowers/flowers-data.service';
import { EntityDataService } from '@ngrx/data';
import { UsersDataService } from './core/services/users/users-data.service';
import { ProfileDataService } from './core/services/profile/profile-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    FeaturesModule,
    ViewsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [FlowersDataService, UsersDataService, ProfileDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(entityDataService: EntityDataService, flowersDataService: FlowersDataService, usersDataService: UsersDataService, profileDataService: ProfileDataService){
    entityDataService.registerService('Flower', flowersDataService);
    entityDataService.registerService('User', usersDataService);
    entityDataService.registerService('User', profileDataService);
  }
 }
