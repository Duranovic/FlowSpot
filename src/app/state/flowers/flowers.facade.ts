import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteFavoriteFlowerStart, getFavoriteFlowersStart, getFlowersStart, setFavoriteFlowerStart } from "./flower.action";
import * as selectors from "./flower.selectors";
import { FlowerState } from "./flower.state";

@Injectable({ providedIn: 'root' })
export class FlowersFacade {
    constructor(private store: Store<FlowerState>){}

    getFlowers$ = this.store.select(selectors.getFlowers);
    flowersLoaded$ = this.store.select(selectors.getFlowersLoaded);
    flowersLoading$ = this.store.select(selectors.getFlowersLoading);
    flowersError$ = this.store.select(selectors.getFlowersError);

    getFavoriteFlowers$ = this.store.select(selectors.getFavoriteFlowers);

    public getFlowers() {
        this.store.dispatch(getFlowersStart());
    }

    public getFavoriteFlowers() {
        this.store.dispatch(getFavoriteFlowersStart());
    }

    public setFavoriteFlower(flowerId: number) {
        this.store.dispatch(setFavoriteFlowerStart({flowerId}));
    }

    public deleteFavoriteFlower(flowerId: number, fav_flower_id: number) {
        this.store.dispatch(deleteFavoriteFlowerStart({flowerId, fav_flower_id}));
    }
}