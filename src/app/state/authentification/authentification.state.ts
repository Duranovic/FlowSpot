import { StatusCommonState } from "../app.state";

export interface AuthentificationState {
    user: {
        logged_in: boolean,
        created_account: boolean,
        auth_token: string | null
    },
    status: StatusCommonState
}


const status = {
    loading: false,
    loaded: false,
    error: null
}

export const initialState = {
    user: {
        logged_in: false,
        created_account: false,
        auth_token: null,
    },
    status
} as AuthentificationState