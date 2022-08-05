// Angular and 3rd party
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

// Services
import { AuthentificationFacade } from 'src/app/state/authentification/authentification.facade';
import { FlowersFacade } from 'src/app/state/flowers/flowers.facade';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean> = this.flowersFacade.flowersLoading$;
  public loaded$: Observable<boolean> = this.flowersFacade.flowersLoaded$;
  public flowers$: Observable<any> = this.flowersFacade.getFlowers$;
  public subscription: Subscription;
  public isLoggedIn: boolean;

  constructor(private flowersFacade: FlowersFacade, private authentificationFacade: AuthentificationFacade) {}

  public ngOnInit(): void {
    this.flowersFacade.getFlowers();
  
    this.subscription = this.authentificationFacade.getIsUserLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
