import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SNACKBAR_CONFIG } from 'src/app/core/constants/snackbar-config.constants';
import { AuthentificationDataService } from 'src/app/core/services/authentification/authentification-data.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { loginStart, loginSuccess, loginFailure, createAccountFailure, createAccountSuccess, createAccountStart } from './authentification.action';

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
        ofType(loginStart),
        exhaustMap((action: any)=>{
            return this.authentificationDataService.login(action.user).pipe(
                map((auth_token: string)=>{
                    this._snackBar.open(`✅  You are logged in succesifully!`, 'Close', SNACKBAR_CONFIG);
                    this.tokenStorageService.saveToken(auth_token);
                    return loginSuccess({auth_token});
                }),
                catchError(errResponse =>{
                    this._snackBar.open(`❌ Couldn't log in! Error: ${errResponse.error.error}`, 'Close',  SNACKBAR_CONFIG);
                    return of(loginFailure({error: errResponse.error.error}));
                })
            )
        })
    )
  })

  createAccount$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(createAccountStart),
        exhaustMap((action: any)=>{
            console.log(action.user);
            return this.authentificationDataService.createAccount(action.user).pipe(
                map((userResponse: any)=>{
                    this._snackBar.open(`✅  Account created succesifully!`, 'Close', SNACKBAR_CONFIG);
                    return createAccountSuccess(userResponse.auth_token);
                }),
                catchError(errResponse =>{
                    this._snackBar.open(`❌ Couldn't create account! Error: ${errResponse.error.error}`, 'Close',  SNACKBAR_CONFIG);
                    return of(createAccountFailure({error: errResponse.error.error}));
                })
            )
        })
    )
  })
}
