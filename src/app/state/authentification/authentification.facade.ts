// Angular and 3rd party
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

// Constants, Models
import { User } from "src/app/core/models/user.model";
import * as actions from "./authentification.action";
import * as selectors from "./authentification.selectors";
import { AuthentificationState } from "./authentification.state";

@Injectable({ providedIn: 'root' })
export class AuthentificationFacade {
    constructor(private store: Store<AuthentificationState>){}

    public getIsUserLoggedIn$ = this.store.select(selectors.getIsUserLoggedIn);
    public getIsCreatedAccount$ = this.store.select(selectors.getCreatedAccount);
    public authentificationLoaded$ = this.store.select(selectors.getAuthentificationLoaded);
    public authentificationLoading$ = this.store.select(selectors.getAuthentificationLoading);
    public authentificationError$ = this.store.select(selectors.getAuthentificationError);

    public login(user: Partial<User>) {
        this.store.dispatch(actions.loginStart({user}));
    }

    public createAccount(user: Partial<User>) {
        this.store.dispatch(actions.createAccountStart({user}));
    }

    public resetAuthProps(){
        this.store.dispatch(actions.resetAuthProps());
    }

    public setAuthProps(auth_token: string, logged_in: boolean){
        this.store.dispatch(actions.setAuthProps({auth_token, logged_in}));
    }

    public setAuthToken(auth_token: string) {
        this.store.dispatch(actions.setAuthToken({auth_token}));
    }

    public setLoggedIn(logged_in: boolean) {
        this.store.dispatch(actions.setLoggedIn({logged_in}));
    }

    public setCreatedAccount(created_account: boolean){
        this.store.dispatch(actions.setCreatedAccount({created_account}))
    }
}