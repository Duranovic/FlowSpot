// Angular and 3rd party
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, exhaustMap, map, of, switchMap, Observable } from 'rxjs';

// Services
import { FlowersDataService } from 'src/app/core/services/flowers/flowers-data.service';
import { AuthentificationFacade } from '../authentification/authentification.facade';

// Constants
import { SNACKBAR_CONFIG } from 'src/app/core/constants/snackbar-config.constants';
import * as actions from './flower.action';

@Injectable()
export class FlowersEffects {
  constructor(
    private actions$: Actions,
    private flowersDataService: FlowersDataService,
    private authentificationFacade: AuthentificationFacade,
    private _snackBar: MatSnackBar
  ) {}

  getFlowers$: Observable<any> = createEffect(()=>{
    return this.actions$.pipe(
        ofType(actions.getFlowersStart),
        switchMap(()=>{
            return this.authentificationFacade.getIsUserLoggedIn$.pipe(
                 switchMap(isUserLoggedIn=>{
                    if(isUserLoggedIn){
                        return combineLatest([this.flowersDataService.getFlowers(), this.flowersDataService.getFavoriteFlowers()]);
                    }else{
                        return this.flowersDataService.getFlowers();
                    }
                }),
                map((flowersData)=>{
                    if(Array.isArray(flowersData)){
                        const [flowers, fav_flowers] = flowersData;
                        return actions.getFlowersSuccess({flowers: flowers.flowers, favoriteFlowers: fav_flowers.fav_flowers});
                    }
                    return actions.getFlowersSuccess({flowers: flowersData.flowers, favoriteFlowers: []});
                }),
                catchError(errResponse =>{
                    this._snackBar.open(`❌ Couldn't get flowers from the server! Error: ${errResponse.error.error}`, 'Close',  SNACKBAR_CONFIG);
                    return of(actions.getFlowersFailure({error: errResponse.error.error}));
                })
                
            )
        })
    )
  })

  getFavoriteFlowers$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(actions.getFavoriteFlowersStart),
        exhaustMap(()=>{
            return combineLatest([this.flowersDataService.getFavoriteFlowers(), this.authentificationFacade.getIsUserLoggedIn$]).pipe(
                map(([favoriteFlowers, isUserLoggedIn])=>{
                    const fav_flowers = isUserLoggedIn ? favoriteFlowers : null;
                    return actions.getFavoriteFlowersSuccess(fav_flowers);
                }),
                catchError(error=>{                    
                    this._snackBar.open(`❌ Couldn't get Favorite flowers from the server!`, 'Close',  SNACKBAR_CONFIG);
                    return of(actions.getFlowersFailure({error: error.message}));
                })
            )
        })
    )
  })

  setFavoriteFlower$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(actions.setFavoriteFlowerStart),
        switchMap((action)=> {            
            return this.flowersDataService.setFavoriteFlower(action.flowerId);
        }),
        map(favoriteFlower=>{
            return actions.setFavoriteFlowerSuccess(favoriteFlower);
        }),
        catchError(errResponse=> {
            this._snackBar.open(`❌ Couldn't set favorite flower! Error: ${errResponse.error.error}`, 'Close',  SNACKBAR_CONFIG);
            return of(actions.setFavoriteFlowerFailure({error: errResponse.error.error}));
        })
    )
  })

  deleteFavoriteFlower$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(actions.deleteFavoriteFlowerStart),
        switchMap((action)=> {
            return this.flowersDataService.deleteFavoriteFlower(action.flowerId, action.fav_flower_id);
        }),
        map(favoriteFlower=>{
            return actions.deleteFavoriteFlowerSuccess(favoriteFlower);
        }),
        catchError(errResponse=> {
            this._snackBar.open(`❌ Couldn't set favorite flower! Error: ${errResponse.error.error}`, 'Close',  SNACKBAR_CONFIG);
            return of(actions.deleteFavoriteFlowerFailure({error: errResponse.error.error}));
        })
    )
  })

}
