import { RefObject, useEffect, useRef } from 'react';

import { CurrentStateStorage, getBlockInfo } from '@vkontakte/mini-apps-analytics';

export const useBlockRef = <T extends HTMLElement>(): RefObject<T> => {
  const blockRef = useRef<T>(null);

  /** Собираем данные на основе дата-аттрибутов с элемента блока */
  useEffect(() => {
    if (!blockRef.current) {
      return;
    }

    const blockInfo = getBlockInfo(blockRef.current, []);

    if (!blockInfo.actionBlockId) {
      return;
    }

    const modalElement = document.querySelector(CurrentStateStorage.modalRootSelector);

    /* Если есть активная модалка, собираем данные только с нее */
    if (modalElement && !modalElement.contains(blockRef.current)) {
      return;
    }

    CurrentStateStorage.registerBlock({
      id: blockInfo.actionBlockId,
      entityType: blockInfo.actionEntityType,
      name: blockInfo.actionBlockName,
      items: blockInfo.isBlockLeaf ? [blockInfo.actionBlockId] : [],
    });
  }, [blockRef.current]);

  return blockRef;
};
