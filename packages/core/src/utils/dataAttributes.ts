import { CustomData } from '../types';

export const dataBlockIdKey = 'data-block-id';
export const dataBlockNameKey = 'data-block-name';
export const dataBlockIsLeaf = 'data-block-is-leaf';

export const dataBlockLoading = 'data-block-is-loading-content';
export const dataEntityTypeKey = 'data-entity-type';

type BlockParams = { id: string | number; entityType?: string; name?: string; isLeaf?: boolean };
export const getBlockParameters = ({ id, entityType, name, isLeaf }: BlockParams) => ({
  ['data-type']: 'block',
  [dataBlockIdKey]: id,
  [dataEntityTypeKey]: entityType || '',
  [dataBlockNameKey]: name || '',
  [dataBlockIsLeaf]: isLeaf ? 'true' : 'false',
});

export const dataItemIdKey = 'data-item-id';
export const dataItemNameKey = 'data-item-name';
export const dataEventTypeKey = 'data-event-type';
export const dataTapEventValue = 'tap';

export const getItemParameters = (id: string | number, name?: string) =>
  name
    ? {
        [dataItemIdKey]: id,
        [dataItemNameKey]: name,
      }
    : {
        [dataItemIdKey]: id,
      };

export const getTappableItemParameters = (id: string | number, name?: string, data?: CustomData) =>
  data
    ? {
        ...getItemParameters(id, name),
        [dataEventTypeKey]: dataTapEventValue,
        ['data-json']: JSON.stringify(data),
      }
    : {
        ...getItemParameters(id, name),
        [dataEventTypeKey]: dataTapEventValue,
      };

export const storedValueTypeKey = 'data-stored-type';
export const storedValueValueKey = 'data-stored-value';

export const getStoredValueAttributes = (type: string, value?: string | number) => ({
  [storedValueTypeKey]: type,
  [storedValueValueKey]: value,
});
