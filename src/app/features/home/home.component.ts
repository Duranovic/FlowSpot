import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthentificationFacade } from 'src/app/state/authentification/authentification.facade';
import { FlowersFacade } from 'src/app/state/flowers/flowers.facade';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean> = this.flowersFacade.flowersLoading$;
  loaded$: Observable<boolean> = this.flowersFacade.flowersLoaded$;
  flowers$: Observable<any> = this.flowersFacade.getFlowers$;
  subscription: Subscription;
  isLoggedIn: boolean;

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
