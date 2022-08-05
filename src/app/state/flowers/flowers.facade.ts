// Angular and 3rd party
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

// Constants, models
import * as actions from "./flower.action";
import * as selectors from "./flower.selectors";
import { FlowerState } from "./flower.state";

@Injectable({ providedIn: 'root' })
export class FlowersFacade {
    constructor(private store: Store<FlowerState>){}

    public getFlowers$ = this.store.select(selectors.getFlowers);
    public flowersLoaded$ = this.store.select(selectors.getFlowersLoaded);
    public flowersLoading$ = this.store.select(selectors.getFlowersLoading);
    public flowersError$ = this.store.select(selectors.getFlowersError);
    public getFavoriteFlowers$ = this.store.select(selectors.getFavoriteFlowers);

    public getFlowers() {
        this.store.dispatch(actions.getFlowersStart());
    }

    public getFavoriteFlowers() {
        this.store.dispatch(actions.getFavoriteFlowersStart());
    }

    public setFavoriteFlower(flowerId: number) {
        this.store.dispatch(actions.setFavoriteFlowerStart({flowerId}));
    }

    public deleteFavoriteFlower(flowerId: number, fav_flower_id: number) {
        this.store.dispatch(actions.deleteFavoriteFlowerStart({flowerId, fav_flower_id}));
    }
}