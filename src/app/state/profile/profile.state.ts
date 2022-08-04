import { User } from "src/app/core/models/user.model"
import { StatusCommonState } from "../app.state"

export interface ProfileState {
    user: any | null,
    status: StatusCommonState
}

export const initialState = {
    user: null,
    status: {
        loading: false,
        loaded: false,
        error: null
    }
} as ProfileState