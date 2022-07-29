import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class FlowersService extends EntityCollectionServiceBase<any> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Flower', serviceElementFactory);
   }
}
