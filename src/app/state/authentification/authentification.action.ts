import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";

// ## Constants
// Login constants
export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';

// CREATE_ACCOUNT constants
export const CREATE_ACCOUNT_START = '[Auth] Create Account Start';
export const CREATE_ACCOUNT_SUCCESS = '[Auth] Create Account Success';
export const CREATE_ACCOUNT_FAILURE = '[Auth] Create Account Failure';

// SET INDIVIDUAL PROPERTIES constants
export const SET_AUTH_PROPS = '[Auth] Set authentification properties';
export const RESET_AUTH_PROPS = '[Auth] Reset authentification properties';
export const SET_AUTH_TOKEN = '[Auth] Set auth_token';
export const SET_LOGGED_IN = '[Auth] Set logged in';
export const SET_CREATED_ACCOUNT = '[Auth] Set created account';


// ## Creating actions
// LOGIN actions
// Partial is because we just need email and password
export const loginStart = createAction(LOGIN_START, props<{user: Partial<User>}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{auth_token: string}>());
export const loginFailure = createAction(LOGIN_FAILURE, props<{error: string | null}>());

// CREATE_ACCOUNT actions
export const createAccountStart = createAction(CREATE_ACCOUNT_START, props<{user: Partial<User>}>());
export const createAccountSuccess = createAction(CREATE_ACCOUNT_SUCCESS, props<{auth_token: string}>());
export const createAccountFailure = createAction(CREATE_ACCOUNT_FAILURE, props<{error: string}>());

// AUTH PROPERTIES
export const setAuthProps = createAction(SET_AUTH_PROPS, props<{auth_token: string, logged_in: boolean}>());
export const resetAuthProps = createAction(RESET_AUTH_PROPS);
export const setAuthToken = createAction(SET_AUTH_TOKEN, props<{auth_token: string}>());
export const setLoggedIn = createAction(SET_LOGGED_IN, props<{logged_in: boolean}>());
export const setCreatedAccount = createAction(SET_CREATED_ACCOUNT, props<{created_account: boolean}>());