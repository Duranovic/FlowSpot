import { createAction, props } from "@ngrx/store";
import { Flower } from "src/app/core/models/flower.model";

// ## Constants
// Flowers constants
export const GET_FLOWERS_START = '[Flowers] flowers Start';
export const GET_FLOWERS_SUCCESS = '[Flowers] flowers Success';
export const GET_FLOWERS_FAILURE = '[Flowers] flowers Failure';

// Favorite flowers constants
export const GET_FAVORITE_FLOWERS_START = '[Flowers] Get Favorite Flowers Start';
export const GET_FAVORITE_FLOWERS_SUCCESS = '[Flowers] Get Favorite Flowers Success';
export const GET_FAVORITE_FLOWERS_FAILURE = '[Flowers] Get Favorite Flowers Failure';

// Individual flowers actions
export const SET_FAVORITE_FLOWER_START = '[Flowers] Set Favorite Flower Start';
export const SET_FAVORITE_FLOWER_SUCCESS = '[Flowers] Set Favorite Flower Success';
export const SET_FAVORITE_FLOWER_FAILURE = '[Flowers] Set Favorite Flower Failure';

export const DELETE_FAVORITE_FLOWER_START = '[Flowers] Delete Favorite Flower Start';
export const DELETE_FAVORITE_FLOWER_SUCCESS = '[Flowers] Delete Favorite Flower Success';
export const DELETE_FAVORITE_FLOWER_FAILURE = '[Flowers] Delete Favorite Flower Failure';


// ## Creating actions
// Flowers actions
export const getFlowersStart = createAction(GET_FLOWERS_START);
export const getFlowersSuccess = createAction(GET_FLOWERS_SUCCESS, props<{flowers: Flower[], favoriteFlowers: any}>());
export const getFlowersFailure = createAction(GET_FLOWERS_FAILURE, props<{error: string | null}>());

// Favorite flowers actions
export const getFavoriteFlowersStart = createAction(GET_FAVORITE_FLOWERS_START);
export const getFavoriteFlowersSuccess = createAction(GET_FAVORITE_FLOWERS_SUCCESS, props<{fav_flowers: any}>());
export const getFavoriteFlowersFailure = createAction(GET_FAVORITE_FLOWERS_FAILURE, props<{error: string}>());

export const setFavoriteFlowerStart = createAction(SET_FAVORITE_FLOWER_START, props<{flowerId: number}>());
export const setFavoriteFlowerSuccess = createAction(SET_FAVORITE_FLOWER_SUCCESS, props<{fav_flower: any}>())
export const setFavoriteFlowerFailure = createAction(SET_FAVORITE_FLOWER_FAILURE, props<{error: string}>());

export const deleteFavoriteFlowerStart = createAction(DELETE_FAVORITE_FLOWER_START, props<{flowerId: number, fav_flower_id: number}>());
export const deleteFavoriteFlowerSuccess = createAction(DELETE_FAVORITE_FLOWER_SUCCESS, props<{fav_flower: any}>())
export const deleteFavoriteFlowerFailure = createAction(DELETE_FAVORITE_FLOWER_FAILURE, props<{error: string}>());