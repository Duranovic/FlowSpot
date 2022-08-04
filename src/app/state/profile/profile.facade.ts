import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getProfileStart } from "./profile.actions";
import { error, getProfile, loaded, loading } from "./profile.selectors";
import { ProfileState } from "./profile.state";

@Injectable({ providedIn: 'root' })
export class ProfileFacade {
    constructor(private store: Store<ProfileState>){ }

    getProfile$ = this.store.select(getProfile);
    loaded$ = this.store.select(loaded);
    loading$ = this.store.select(loading);
    error$ = this.store.select(error);

    getProfile() {
        this.store.dispatch(getProfileStart());
    }
}