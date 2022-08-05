import { Flower } from "src/app/core/models/flower.model";
import { StatusCommonState } from "../app.state";

export interface FlowerState {
    flowers: {
        list: Flower[],
        status: StatusCommonState
    },
    favoriteFlowers: {
        list: any,
        status: StatusCommonState,
    }
}

const status = {
    loading: false,
    loaded: false,
    error: null
}

export const initialState = {
    flowers: {
        list: [],
        status
    },
    favoriteFlowers: {
        list: [],
        status
    }
} as FlowerState