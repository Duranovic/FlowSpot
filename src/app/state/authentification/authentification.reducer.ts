// Angular and 3rd party
import { createReducer, on } from '@ngrx/store';

// Constants, Models
import { ACTION_STATUS_FAILURE, ACTION_STATUS_START, ACTION_STATUS_SUCCESS } from 'src/app/core/constants/redux-actions.constants';
import * as actions from './authentification.action';
import { initialState } from './authentification.state';

const _authentificationReducer = createReducer(
  initialState, 
  on(actions.loginStart, (state:any)=>({
    ...state,
    status: ACTION_STATUS_START(state)
  })),
  
  on(actions.loginSuccess, (state:any, action)=>({
    ...state,
    user: {
      ...state.user,
      logged_in: true,
      auth_token: action.auth_token
    },
    status: ACTION_STATUS_SUCCESS
  })),

  on(actions.loginFailure, (state: any, error)=>({
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

  on(actions.createAccountStart, (state)=>(ACTION_STATUS_START(state))),

  on(actions.createAccountSuccess, (state)=> ({
    ...state,
    user: {
      ...state.user,
      created_account: true,
    },
    status: ACTION_STATUS_SUCCESS,
  })),

  on(actions.createAccountFailure, (state, action) => ({
    ...state, 
    status: ACTION_STATUS_FAILURE(action.error)
  })),

  on(actions.setAuthProps, (state, action)=>({
    ...state,
    user: {
      ...state.user,
      auth_token: action.auth_token,
      logged_in: action.logged_in
    }
  })),

  on(actions.resetAuthProps, ()=>({...initialState})),

  on(actions.setLoggedIn, (state: any, action)=>({
    ...state,
    user: {
      ...state.user,
      loggedIn: action.logged_in,
    }
  })),

  on(actions.setAuthToken, (state, action)=>({
    ...state,
    user: {
      ...state.user,
      auth_token: action.auth_token
    }
  })),

  on(actions.setCreatedAccount, (state, action)=>({
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
