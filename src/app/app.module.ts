// Angular and 3rd party modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Custom defined modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { ViewsModule } from './views/views.module';
import { StoreModule } from '@ngrx/store';

// Services
import { FlowersDataService } from './core/services/flowers/flowers-data.service';
import { ProfileDataService } from './core/services/profile/profile-data.service';
import { appReducer } from './state/app.state';
import { FlowersEffects } from './state/flowers/flowers.effects';
import { ProfileEffects } from './state/profile/profile.effects';

// Components
import { AppComponent } from './app.component';

// Constants
import { environment } from 'src/environments/environment';
import { AuthentificationEffects } from './state/authentification/authentification.effects';
import { AuthentificationDataService } from './core/services/authentification/authentification-data.service';

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
    StoreModule.forRoot(appReducer, {}),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([FlowersEffects, ProfileEffects, AuthentificationEffects]),
  ],
  providers: [FlowersDataService, ProfileDataService, AuthentificationDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
