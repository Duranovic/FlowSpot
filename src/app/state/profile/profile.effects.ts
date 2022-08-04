import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, withLatestFrom } from "rxjs";
import { SNACKBAR_CONFIG } from "src/app/core/constants/snackbar-config.constants";
import { ProfileDataService } from "src/app/core/services/profile/profile-data.service";
import { getProfileFailure, getProfileStart, getProfileSuccess } from "./profile.actions";

@Injectable()
export class ProfileEffects{
    constructor(private actions$: Actions, private profileDataService: ProfileDataService,  private _snackBar: MatSnackBar){ }

    getProfile$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(getProfileStart),
            exhaustMap(()=>{
                return this.profileDataService.getProfile().pipe(
                    switchMap(user=>{      
                        return this.profileDataService.getSightings(user.id).pipe(
                            map(sightings=>{                        
                                const userData = {
                                    user: {
                                        ...user,
                                        sightings: sightings
                                    }
                                };
                               return getProfileSuccess(userData);
                            })
                        )
                    }),
                    catchError(error=>{
                        this._snackBar.open(`❌ Couldn't get user data from the server!`, 'Close',  SNACKBAR_CONFIG);
                        return of(getProfileFailure(error.message));
                    })
                )
            })
        )
    })

}