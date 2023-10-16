import { CustomData, ID } from '../types';
import { dataItemIdKey, dataItemNameKey } from './dataAttributes';

export type HTMLItemInfo = {
  /** ID элемента, заданый через data-атрибут data-item-id */
  actionElementId: ID;
  /** Порядковый номер элемента в блоке, внутри которого он находится. -1, если элемент не найден в блоке */
  actionElementIndex: number;
  /** Имя блока элемента, заданое через data-атрибут data-item-name */
  actionElementName?: string;
};

export const getItemInfo = <B extends HTMLElement, T extends HTMLElement>(
  block: B | null,
  targetItem: T
): HTMLItemInfo & Partial<CustomData> => {
  const allItems: Element[] = block ? Array.from(block.querySelectorAll(`[${dataItemIdKey}]`)) : [];

  const actionElementId = targetItem.getAttribute(dataItemIdKey) || '';
  const actionElementIndex = allItems.findIndex((item) => item === targetItem);
  const actionElementName = targetItem.getAttribute(dataItemNameKey) || targetItem.innerText;
  const data = targetItem.getAttribute('data-json');

  let jsonData: Partial<CustomData> = {};
  try {
    jsonData = data ? JSON.parse(data) : jsonData;
    /* eslint-disable-next-line no-empty */
  } finally {
  }

  return {
    actionElementId,
    actionElementIndex: actionElementIndex < 0 ? -1 : actionElementIndex + 1,
    actionElementName,
    ...jsonData,
  };
};
