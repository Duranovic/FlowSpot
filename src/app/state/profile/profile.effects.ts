// Angular and 3rd party
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";

// Services
import { ProfileDataService } from "src/app/core/services/profile/profile-data.service";

// Constants
import { SNACKBAR_CONFIG } from "src/app/core/constants/snackbar-config.constants";
import * as actions from "./profile.actions";

@Injectable()
export class ProfileEffects{
    constructor(private actions$: Actions, private profileDataService: ProfileDataService,  private _snackBar: MatSnackBar){ }

    public getProfile$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(actions.getProfileStart),
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
                               return actions.getProfileSuccess(userData);
                            })
                        )
                    }),
                    catchError(error=>{
                        this._snackBar.open(`❌ Couldn't get user data from the server!`, 'Close',  SNACKBAR_CONFIG);
                        return of(actions.getProfileFailure(error.message));
                    })
                )
            })
        )
    })
}