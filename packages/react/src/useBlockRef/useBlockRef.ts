import { CurrentStateStorage, getBlockInfo } from '@vkontakte/mini-apps-analytics';
import { type RefObject, useEffect, useRef } from 'react';

/**
 * Необходим при рендере динамически подгружаемых блоков на странице.
 * В случае, если блоки статичны, простой вызов метода CurrentStateStorage.registerExistingValues
 * зарегистрирует существующие на странице значения.
 *
 * @returns React.ref для регистрации блока.
 * @example
 * import { getBlockParameters, getItemParameters } from '@vkontakte/mini-apps-analytics';
 * import { useBlockRef } from '@vkontakte/mini-apps-analytics-react'
 *
 * const BlockElement = () => {
 *  const blockRef = useBlockRef<HTMLDivElement>()
 *  return (
 *      <div ref={blockRef} {...getBlockParameters({ id: 'blockId', entityType: 'customItemEntity', name: 'custom block name' })}>
 *        <div {...getItemParameters('customItemId')}>custom item content</div>
 *       </div>
 *   )
 * }
 *
 * // Установит в CurrentStateStorage.data: {
 * //  ...,
 * //  blocks: [..., {
 * //    id: 'blockId',
 * //    name: 'custom block name',
 * //    entityType: 'customItemEntity',
 * //    items: ['customItemId']
 * //  }]
 * //  }
 *
 */
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
