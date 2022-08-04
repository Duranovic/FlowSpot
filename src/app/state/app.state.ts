import { authentificationReducer } from "./authentification/authentification.reducer";
import { AuthentificationState } from "./authentification/authentification.state";
import { flowersReducer } from "./flowers/flower.reducer";
import { FlowerState } from "./flowers/flower.state";
import { profileReducer } from "./profile/profile.reducer";
import { ProfileState } from "./profile/profile.state";

export interface StatusCommonState {
    loaded: boolean,
    loading: boolean,
    error: string | null,
}

export interface AppState {
    profile: ProfileState,
    flowers: FlowerState,
    authentification: AuthentificationState,
}

export const appReducer = {
    profile: profileReducer,
    flowers: flowersReducer,
    authentification: authentificationReducer,
}