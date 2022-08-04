import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FlowerState } from "./flower.state";

const getFlowersState =  createFeatureSelector<FlowerState>('flowers');

export const getFlowers = createSelector(getFlowersState, state => {
    return state.flowers.list;
})

export const getFlowersLoaded = createSelector(getFlowersState, state => {
    return state.flowers.status.loaded;
})

export const getFlowersLoading = createSelector(getFlowersState, state => {
    return state.flowers.status.loading;
})

export const getFlowersError = createSelector(getFlowersState, state => {
    return state.flowers.status.error;
})

export const getFavoriteFlowers = createSelector(getFlowersState, state => {
    return state.favoriteFlowers.list;
})

export const getFavoriteFlowersLoaded = createSelector(getFlowersState, state => {
    return state.favoriteFlowers.status.loaded;
})

export const getFavoriteFlowersLoading = createSelector(getFlowersState, state => {
    return state.favoriteFlowers.status.loading;
})

export const getFavoriteFlowersError = createSelector(getFlowersState, state => {
    return state.favoriteFlowers.status.error;
})