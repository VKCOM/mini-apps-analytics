import { ID } from '../types/pageState';
import { getBlockInfo } from './blockElement';
import { getItemInfo } from './getItemInfo';
import { lookForContainerBlockElement, lookForItemElement } from './helpers';

export type ItemPathInfo = {
  /** Тип сущности, определлный на блоке с помощью аттрибута data-entity-type */
  itemType: string;
  /** Id элемента, определнный с помощью аттрибута data-item-id */
  itemId?: ID;
  /** Имя элемента, определнное с помощью аттрибута data-item-name */
  itemName?: string;
  /** Путь по элемента. Пример "block_id item_id" */
  itemPath: string;
};

/** Хелпер для вычисления информации об элементе и его положения на странице */
export const getItemPathInfo = (el: HTMLElement | undefined): ItemPathInfo | undefined => {
  if (el) {
    const block = lookForContainerBlockElement(el);
    const item = lookForItemElement(el);

    const blockInfo = block && getBlockInfo(block, []);
    const itemInfo = item && getItemInfo(el, item);

    if (itemInfo && itemInfo.actionElementId) {
      const actionEntityType = blockInfo?.actionEntityType || 'Unknown entity';

      return {
        itemType: actionEntityType,
        itemId: itemInfo.actionElementId,
        itemName: itemInfo.actionElementName,
        itemPath: `${actionEntityType} ${itemInfo.actionElementId}`,
      };
    }
  }
};
