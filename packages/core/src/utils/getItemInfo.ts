import { CustomData } from '../types';
import { dataItemIdKey, dataItemNameKey } from './dataAttributes';

export const getItemInfo = <B extends HTMLElement, T extends HTMLElement>(block: B | null, targetItem: T) => {
  const allItems: Element[] = block ? Array.from(block.querySelectorAll(`[${dataItemIdKey}]`)) : [];

  const actionElementId = targetItem.getAttribute(dataItemIdKey) || '';
  const actionElementIndex = allItems.findIndex((item) => item === targetItem);
  const actionElementName = targetItem.getAttribute(dataItemNameKey) || targetItem.innerText;
  const data = targetItem.getAttribute('data-json');

  let jsonData: CustomData = {};
  try {
    jsonData = data ? JSON.parse(data) : jsonData;
  } finally {
  }

  return {
    actionElementId,
    actionElementIndex: actionElementIndex < 0 ? -1 : actionElementIndex + 1,
    actionElementName,
    ...jsonData,
  };
};
