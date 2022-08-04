import { createAction, props } from "@ngrx/store";

// ## Constants
// Profile constants
export const GET_PROFILE_START = '[Profile] Get Profile Start';
export const GET_PROFILE_SUCCESS = '[Profile] Get Profile Success';
export const GET_PROFILE_FAILURE = '[Profile] Get Profile Failure';

// User sightings constants
export const GET_USER_SIGHTINGS_START = '[Profile] Get User sightings Start';
export const GET_USER_SIGHTINGS_SUCCESS = '[Profile] Get User sightings Success';
export const GET_USER_SIGHTINGS_FAILURE = '[Profile] Get User sightings Failure';

// ## Creating actions
// Profile actions
export const getProfileStart = createAction(GET_PROFILE_START);
export const getProfileSuccess = createAction(GET_PROFILE_SUCCESS, props<{user: any}>());
export const getProfileFailure = createAction(GET_PROFILE_FAILURE, props<{error: string}>());

// Sightings actions
export const getUserSightingsStart = createAction(GET_USER_SIGHTINGS_START);
export const getUserSightingsSuccess = createAction(GET_USER_SIGHTINGS_SUCCESS, props<{user: any[]}>());
export const getUserSightingsFailure = createAction(GET_USER_SIGHTINGS_FAILURE, props<{error: string}>());