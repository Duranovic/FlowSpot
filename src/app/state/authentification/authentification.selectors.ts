import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthentificationState } from "./authentification.state";

const getAuthentificationState =  createFeatureSelector<AuthentificationState>('authentification');

export const getIsUserLoggedIn = createSelector(getAuthentificationState, state => {
    return state.user.logged_in;
})

export const getUserAuthToken = createSelector(getAuthentificationState, state => {
    return state.user.auth_token;
});

export const getCreatedAccount = createSelector(getAuthentificationState, state => {
    return state.user.created_account;
})

// Status is shared for login and create account
export const getAuthentificationLoaded = createSelector(getAuthentificationState, state => {
    return state.status.loaded;
});

export const getAuthentificationLoading = createSelector(getAuthentificationState, state => {
    return state.status.loading;
});

export const getAuthentificationError = createSelector(getAuthentificationState, state => {
    return state.status.error;
});