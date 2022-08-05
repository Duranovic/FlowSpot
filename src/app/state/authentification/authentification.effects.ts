// Angular and 3rd party
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// Services
import { AuthentificationDataService } from 'src/app/core/services/authentification/authentification-data.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

// Utils
import { extractErrorMessage } from 'src/app/core/utils/request.utils';

// Constants, Models
import { SNACKBAR_CONFIG } from 'src/app/core/constants/snackbar-config.constants';
import * as actions from './authentification.action';

@Injectable()
export class AuthentificationEffects {
  constructor(
    private actions$: Actions,
    private authentificationDataService: AuthentificationDataService,
    private _snackBar: MatSnackBar,
    private tokenStorageService: TokenStorageService
  ) {}

  login$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(actions.loginStart),
        exhaustMap((action: any)=>{
            return this.authentificationDataService.login(action.user).pipe(
                map((auth_token: string)=>{
                    this._snackBar.open(`✅  You are logged in succesifully!`, 'Close', SNACKBAR_CONFIG);
                    this.tokenStorageService.saveToken(auth_token);
                    return actions.loginSuccess({auth_token});
                }),
                catchError(errResponse =>{
                    this._snackBar.open(`❌ Couldn't log in! Error: ${extractErrorMessage(errResponse)}`, 'Close',  SNACKBAR_CONFIG);
                    return of(actions.loginFailure({error: extractErrorMessage(errResponse)}));
                })
            )
        })
    )
  })

  createAccount$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(actions.createAccountStart),
        exhaustMap((action: any)=>{
            return this.authentificationDataService.createAccount(action.user).pipe(
                map((userResponse: any)=>{
                    this._snackBar.open(`✅  Account created succesifully!`, 'Close', SNACKBAR_CONFIG);
                    return actions.createAccountSuccess(userResponse.auth_token);
                }),
                catchError(errResponse =>{
                    this._snackBar.open(`❌ Couldn't create account! Error: ${extractErrorMessage(errResponse)}`, 'Close',  SNACKBAR_CONFIG);
                    return of(actions.createAccountFailure({error: extractErrorMessage(errResponse)}));
                })
            )
        })
    )
  })
}
