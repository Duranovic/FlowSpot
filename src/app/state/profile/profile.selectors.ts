// Angular and 3rd party
import { createFeatureSelector, createSelector } from "@ngrx/store";

// Models
import { ProfileState } from "./profile.state";

const getProfileState =  createFeatureSelector<ProfileState>('profile');

export const getProfile = createSelector(getProfileState, state => {
    return state.user;
})

export const loaded = createSelector(getProfileState, state=>{
    return state.status.loaded
})

export const loading = createSelector(getProfileState, state=>{
    return state.status.loading
})

export const error = createSelector(getProfileState, state=>{
    return state.status.error
})