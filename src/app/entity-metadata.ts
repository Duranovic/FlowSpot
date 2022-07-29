import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    Flower: {},
    User: {},
}

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata: entityMetadata
}