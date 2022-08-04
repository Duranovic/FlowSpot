import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";
import { loginStart, createAccountStart, setAuthToken, setLoggedIn, setAuthProps, setCreatedAccount, resetAuthProps } from "./authentification.action";
import { getAuthentificationError, getAuthentificationLoaded, getAuthentificationLoading, getCreatedAccount, getIsUserLoggedIn } from "./authentification.selectors";
import { AuthentificationState } from "./authentification.state";

@Injectable({ providedIn: 'root' })
export class AuthentificationFacade {
    constructor(private store: Store<AuthentificationState>){}

    public getIsUserLoggedIn$ = this.store.select(getIsUserLoggedIn);
    public getIsCreatedAccount$ = this.store.select(getCreatedAccount);
    public authentificationLoaded$ = this.store.select(getAuthentificationLoaded);
    public authentificationLoading$ = this.store.select(getAuthentificationLoading);
    public authentificationError$ = this.store.select(getAuthentificationError);

    public login(user: Partial<User>) {
        this.store.dispatch(loginStart({user}));
    }

    public createAccount(user: Partial<User>) {
        this.store.dispatch(createAccountStart({user}));
    }

    public resetAuthProps(){
        this.store.dispatch(resetAuthProps());
    }

    public setAuthProps(auth_token: string, logged_in: boolean){
        this.store.dispatch(setAuthProps({auth_token, logged_in}));
    }

    public setAuthToken(auth_token: string) {
        this.store.dispatch(setAuthToken({auth_token}));
    }

    public setLoggedIn(logged_in: boolean) {
        this.store.dispatch(setLoggedIn({logged_in}));
    }

    public setCreatedAccount(created_account: boolean){
        this.store.dispatch(setCreatedAccount({created_account}))
    }
}