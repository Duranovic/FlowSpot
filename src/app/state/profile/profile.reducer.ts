import { createReducer, on } from "@ngrx/store";
import { ACTION_STATUS_FAILURE, ACTION_STATUS_START, ACTION_STATUS_SUCCESS } from "src/app/core/constants/redux-actions.constants";
import * as actions from "./profile.actions";
import { initialState } from "./profile.state";

const _profileReducer = createReducer(initialState, 
    on(actions.getProfileStart, (state: any)=>{        
        return {
            ...state,
            status: ACTION_STATUS_START
        }
}),
on(actions.getProfileSuccess, (state:any, action)=>{
    return {
        ...state,
        user: action.user,
        status: ACTION_STATUS_SUCCESS
    }
}),
on(actions.getProfileFailure, (state:any, action)=>{
    return {
        ...state,
        status: ACTION_STATUS_FAILURE(action.error)
    }
})
);

export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action);
}