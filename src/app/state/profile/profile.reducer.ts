import { createReducer, on } from "@ngrx/store";
import { getProfileFailure, getProfileStart, getProfileSuccess } from "./profile.actions";
import { initialState } from "./profile.state";

const _profileReducer = createReducer(initialState, 
    on(getProfileStart, (state: any)=>{        
        return {
            ...state,
            status: {
                loading: true,
                loaded: false,
                error: null
            }
        }
}),
on(getProfileSuccess, (state:any, action)=>{
    console.log(action);
    return {
        ...state,
        user: action.user,
        status: {
            loading: false,
            loaded: true,
            error: null,
        }
    }
}),
on(getProfileFailure, (state:any, action)=>{
    return {
        ...state,
        status: {
            loading: false,
            loaded: false,
            error: action.error,
        }
    }
})
);

export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action);
}