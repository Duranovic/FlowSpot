// Angular and 3rd party
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

// Constants, Models
import { getProfileStart } from "./profile.actions";
import { error, getProfile, loaded, loading } from "./profile.selectors";
import { ProfileState } from "./profile.state";

@Injectable({ providedIn: 'root' })
export class ProfileFacade {
    constructor(private store: Store<ProfileState>){ }

    public getProfile$ = this.store.select(getProfile);
    public loaded$ = this.store.select(loaded);
    public loading$ = this.store.select(loading);
    public error$ = this.store.select(error);

    public getProfile(): void {
        this.store.dispatch(getProfileStart());
    }
}