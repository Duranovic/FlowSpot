import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, EMPTY, exhaustMap, iif, map, tap, of, switchMap, withLatestFrom, Observable } from 'rxjs';
import { SNACKBAR_CONFIG } from 'src/app/core/constants/snackbar-config.constants';
import { Flower } from 'src/app/core/models/flower.model';
import { FlowersDataService } from 'src/app/core/services/flowers/flowers-data.service';
import { AuthentificationFacade } from '../authentification/authentification.facade';
import { getIsUserLoggedIn } from '../authentification/authentification.selectors';
import { getFavoriteFlowersStart, getFavoriteFlowersSuccess, getFlowersFailure, getFlowersStart, getFlowersSuccess, setFavoriteFlowerStart, setFavoriteFlowerFailure, setFavoriteFlowerSuccess, deleteFavoriteFlowerStart, deleteFavoriteFlowerSuccess, deleteFavoriteFlowerFailure } from './flower.action';

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
        ofType(getFlowersStart),
        switchMap(()=>{
            return this.authentificationFacade.getIsUserLoggedIn$.pipe(
                 switchMap(isUserLoggedIn=>{
                    if(isUserLoggedIn){
                        console.log("USER LOGGED IN: ", isUserLoggedIn);
                        return combineLatest([this.flowersDataService.getFlowers(), this.flowersDataService.getFavoriteFlowers()]);
                    }else{
                        console.log("USER NOT LOGGED IN: ", isUserLoggedIn);
                        return this.flowersDataService.getFlowers();
                    }
                }),
                map((flowersData)=>{
                    if(Array.isArray(flowersData)){
                        const [flowers, fav_flowers] = flowersData;
                        return getFlowersSuccess({flowers: flowers.flowers, favoriteFlowers: fav_flowers.fav_flowers});
                    }
                    return getFlowersSuccess({flowers: flowersData.flowers, favoriteFlowers: []});
                }),
                catchError(errResponse =>{
                    this._snackBar.open(`❌ Couldn't get flowers from the server! Error: ${errResponse.error.error}`, 'Close',  SNACKBAR_CONFIG);
                    return of(getFlowersFailure({error: errResponse.error.error}));
                })
                
            )
        })
    )
  })

  getFavoriteFlowers$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(getFavoriteFlowersStart),
        exhaustMap(()=>{
            return combineLatest([this.flowersDataService.getFavoriteFlowers(), this.authentificationFacade.getIsUserLoggedIn$]).pipe(
                map(([favoriteFlowers, isUserLoggedIn])=>{
                    const fav_flowers = isUserLoggedIn ? favoriteFlowers : null;
                    return getFavoriteFlowersSuccess(fav_flowers);
                }),
                catchError(error=>{                    
                    this._snackBar.open(`❌ Couldn't get Favorite flowers from the server!`, 'Close',  SNACKBAR_CONFIG);
                    return of(getFlowersFailure({error: error.message}));
                })
            )
        })
    )
  })

  setFavoriteFlower$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(setFavoriteFlowerStart),
        switchMap((action)=> {            
            return this.flowersDataService.setFavoriteFlower(action.flowerId);
        }),
        map(favoriteFlower=>{
            return setFavoriteFlowerSuccess(favoriteFlower);
        }),
        catchError(errResponse=> {
            this._snackBar.open(`❌ Couldn't set favorite flower! Error: ${errResponse.error.error}`, 'Close',  SNACKBAR_CONFIG);
            return of(setFavoriteFlowerFailure({error: errResponse.error.error}));
        })
    )
  })

  deleteFavoriteFlower$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(deleteFavoriteFlowerStart),
        switchMap((action)=> {
            return this.flowersDataService.deleteFavoriteFlower(action.flowerId, action.fav_flower_id);
        }),
        map(favoriteFlower=>{
            return deleteFavoriteFlowerSuccess(favoriteFlower);
        }),
        catchError(errResponse=> {
            this._snackBar.open(`❌ Couldn't set favorite flower! Error: ${errResponse.error.error}`, 'Close',  SNACKBAR_CONFIG);
            return of(deleteFavoriteFlowerFailure({error: errResponse.error.error}));
        })
    )
  })

}
