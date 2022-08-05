// Angular and 3rd party
import { createReducer, on } from '@ngrx/store';

// Constants, Models
import {
  ACTION_STATUS_FAILURE,
  ACTION_STATUS_START,
  ACTION_STATUS_SUCCESS,
} from 'src/app/core/constants/redux-actions.constants';
import { Flower } from 'src/app/core/models/flower.model';
import * as actions from './flower.action';
import { initialState } from './flower.state';

const _flowersReducer = createReducer(
  initialState,

  on(actions.getFlowersStart, (state: any) => ({
    ...state,
    flowers: {
      status: ACTION_STATUS_START
    },
  })),

  on(actions.getFlowersSuccess, (state: any, action) => {
    if(action.favoriteFlowers.length === 0){
      return {
        ...state,
        flowers: {
          list: action.flowers,
          status: ACTION_STATUS_SUCCESS,
        }
      }
    } else{
      let joinedFlowers: Flower[] = [];
      let favoriteFound: boolean;
      action.flowers.forEach((flower) => {
        favoriteFound = false;
         action.favoriteFlowers.map((fav_flowers:any) => {
          if(fav_flowers.flower.id === flower.id){
            favoriteFound = true;            
             joinedFlowers.push({
              ...flower,
              favorite: true,
              favorite_id: fav_flowers.id,
            })}
          }
      )
      if(!favoriteFound){
        joinedFlowers.push(flower);
      }
    })
    return {
      ...state,
      flowers: {
        list: joinedFlowers,
        status: ACTION_STATUS_SUCCESS,
      },
      favoriteFlowers: {
        list: action.favoriteFlowers,
        status: ACTION_STATUS_SUCCESS,
      },
    };
    }
  }),

  on(actions.getFlowersFailure, (state: any, action) => ({
    ...state,
    flowers: {
      ...state.flowers,
      status: {
        ...state.flowers.status,
        error: action.error,
        loaded: false,
        loading: true,
      },
    },
  })),

  on(actions.getFavoriteFlowersStart, (state: any) => ({
    ...state,
    favoriteFlowers: {
      status: ACTION_STATUS_START
    },
  })),

  on(actions.getFavoriteFlowersSuccess, (state: any, action) => ({
    ...state,
    favoriteFlowers: {
      list: action.fav_flowers,
      status: {
        error: null,
        loaded: true,
        loading: false,
      },
    },
  })),

  on(actions.getFavoriteFlowersFailure, (state: any, action) => ({
    ...state,
    favoriteFlowers: {
      ...state.favorite_flowers,
      status: {
        loading: false,
        loaded: false,
        error: action.error,
      },
    },
  })),

  on(actions.setFavoriteFlowerStart, (state) => ({
    ...state,
    flowers: {
      ...state.flowers,
      status: ACTION_STATUS_START(state),
    },
  })),

  on(actions.setFavoriteFlowerSuccess, (state, action: any) => {
    return {
      ...state,
      flowers: {
        list: state.flowers.list.map((flower) => {
          return flower.id === action.fav_flower.flower.id
            ? {
                ...flower,
                favorite: true,     
                favorite_id: action.fav_flower.id,           
              }
            : flower;
        }),
        status: ACTION_STATUS_SUCCESS,
      },
    };
  }),

  on(actions.setFavoriteFlowerFailure, (state, action) => ({
    ...state,
    flowers: {
      ...state.flowers,
      status: ACTION_STATUS_FAILURE(action.error),
    },
  })),

  on(actions.deleteFavoriteFlowerStart, (state) => ({
    ...state,
    flowers: {
      ...state.flowers,
      status: ACTION_STATUS_START(state),
    },
  })),

  on(actions.deleteFavoriteFlowerSuccess, (state, action) => ({
    ...state,
    flowers: {
      ...state.flowers,
      status: ACTION_STATUS_SUCCESS,
      list: state.flowers.list.map((flower) => {
        return flower.id === action.fav_flower.flower.id
          ? {
              ...flower,
              favorite: false,
              favorite_id: action.fav_flower.id
            }
          : flower;
      }),
    },
  }))
);

export function flowersReducer(state: any, action: any): any {
  return _flowersReducer(state, action);
}
