import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends EntityCollectionServiceBase<any> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementFactory);
   }
}
