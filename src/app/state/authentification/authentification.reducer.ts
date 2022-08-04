import { createReducer, on } from '@ngrx/store';
import { ACTION_STATUS_FAILURE, ACTION_STATUS_START, ACTION_STATUS_SUCCESS } from 'src/app/core/constants/redux-actions.constants';
import { UsersService } from 'src/app/core/services/authentification/users.service';
import {
  createAccountFailure,
  createAccountStart,
  createAccountSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  resetAuthProps,
  setAuthProps,
  setAuthToken,
  setCreatedAccount,
  setLoggedIn,
} from './authentification.action';
import { initialState } from './authentification.state';

const _authentificationReducer = createReducer(
  initialState, 
  on(loginStart, (state:any)=>({
    ...state,
    status: ACTION_STATUS_START(state)
  })),
  on(loginSuccess, (state:any, action)=>({
    ...state,
    user: {
      ...state.user,
      logged_in: true,
      auth_token: action.auth_token
    },
    status: ACTION_STATUS_SUCCESS
  })),
  on(loginFailure, (state: any, error)=>({
    ...state,
    user: {
      ...state.user,
    },
    status: {
      loaded: false,
      loading: false,
      error
    }
  })),
  on(createAccountStart, (state)=>(ACTION_STATUS_START(state))),
  on(createAccountSuccess, (state, action)=> ({
    ...state,
    user: {
      ...state.user,
      created_account: true,
    },
    status: ACTION_STATUS_SUCCESS,
  })),
  on(createAccountFailure, (state, action) => ({
    ...state, 
    status: ACTION_STATUS_FAILURE(action.error)
  })),
  on(setAuthProps, (state, action)=>({
    ...state,
    user: {
      ...state.user,
      auth_token: action.auth_token,
      logged_in: action.logged_in
    }
  })),
  on(resetAuthProps, (state)=>({...initialState})),
  on(setLoggedIn, (state: any, action)=>({
    ...state,
    user: {
      ...state.user,
      loggedIn: action.logged_in,
    }
  })),
  on(setAuthToken, (state, action)=>({
    ...state,
    user: {
      ...state.user,
      auth_token: action.auth_token
    }
  })),
  on(setCreatedAccount, (state, action)=>({
    ...state,
    user: {
      ...state.user,
      created_account: action.created_account
    }
  }))
)

export function authentificationReducer(state: any, action: any): any {
  return _authentificationReducer(state, action);
}
