import {CustomData, ID} from '../types';

export const dataBlockIdKey = 'data-block-id';
export const dataBlockNameKey = 'data-block-name';
/**
 * Data-атрибут для обозначения того, что блок является листовым.
 *
 * Листовой блок - блок, являющийся единственным на странице и содержащий информацию только об одном элементе.
 *
 * @example Модалка/страница конкретного товара/акции - базовый пример листового блока: вся страница является представлением
 * единсвтенной сущности
 * */
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

export type ItemDataAttributes = {
    [dataItemIdKey]: ID;
    [dataItemNameKey]?: string;
}

/** Функция-хелпер для создания набора data-атрибутов для элемента */
export const getItemParameters = (id: ID, name?: string): ItemDataAttributes =>
  name
    ? {
        [dataItemIdKey]: id,
        [dataItemNameKey]: name,
      }
    : {
        [dataItemIdKey]: id,
      };

export type TappableItemDataAttributes = ItemDataAttributes & {
    [dataEventTypeKey]: 'tap',
    /** Любые дополнительные данные, которые сохраняются в DOM-дереве. Внутри - Partial<CustomData> */
    'data-json'?: string;
}

/** Функция-хелпер для создания набора data-атрибутов для элемента, по которому собирается аналитика
 * по tap событию */
export const getTappableItemParameters = (id: ID, name?: string, data?: Partial<CustomData>): TappableItemDataAttributes =>
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
