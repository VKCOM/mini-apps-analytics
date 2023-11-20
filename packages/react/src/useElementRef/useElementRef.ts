import { CurrentStateStorage, getItemInfo, ID } from '@vkontakte/mini-apps-analytics';
import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Необходим при рендере динамически подгружаемых элементов на странице.
 * В случае, если контент статичен, простой вызов метода CurrentStateStorage.registerExistingValues
 * зарегистрирует существующие на странице значения.
 *
 * @param id Для упрощения работы рантайма, необходимо передать id блока, внутри которого находится элемент
 * @returns React.ref для регистрации элемента внутри блока.
 *
 * @example
 * import { useState } from 'react';
 * import { getBlockParameters, getItemParameters } from '@vkontakte/mini-apps-analytics';
 * import { useBlockRef, useItemRef } from '@vkontakte/mini-apps-analytics-react'
 *
 * const Item: React.FC<{blockId: string}> = (props) => {
 *  const itemRef = useItemRef<HTMLBlockElement>(props.)blockId;
 *  return <div ref={itemRef} {...getItemParameters('customItemId')}>custom item content</div>
 * }
 *
 * const BlockElement = () => {
 * const [isLoading, setIsLoading] = useState(true);
 *  useEffect(() => {
 *    setTimeout(() => {setIsLoading(false)}, 1000)
 *  }, [])
 *
 *   return (
 *     <div {...getBlockParameters({ id: 'blockId', entityType: 'customItemEntity', name: 'custom block name' })}>
 *       {!isLoading && <div blockId="blockId" />}
 *     </div>
 *   )
 * }
 *
 * // После вызова setIsLoading(false) установит в CurrentStateStorage.data: {
 * // ...,
 * // blocks: [..., {
 * //   id: 'blockId',
 * //   name: 'custom block name',
 * //   entityType: 'customItemEntity',
 * //   items: ['customItemId']
 * // }]
 * // }
 *
 */
export const useItemRef = <T extends HTMLElement>(id: ID): MutableRefObject<T | null> => {
  const itemRef = useRef<T>(null);

  /** Собираем данные на основе дата-аттрибутов с элемента внутри блока */
  useEffect(() => {
    /**
     * При обновлении страницы всплывают от чайлда к родителю, что приводит к тому, что, на момент
     * регистрации айтемов, соответствующий блок еще не зарегистрирован. Чтобы обойти ограничение реакта
     * смещаем вызов колбека на след тик
     */
    setTimeout(() => {
      if (!itemRef.current) {
        return;
      }

      const itemInfo = getItemInfo(null, itemRef.current);

      CurrentStateStorage.addItemByBlockId(id.toString(), {
        id: itemInfo.actionElementId,
        name: itemInfo.actionElementName,
      });
    }, 0);
  }, [itemRef.current]);

  return itemRef;
};
