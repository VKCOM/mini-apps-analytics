import { MutableRefObject, useEffect, useRef } from 'react';
import { CurrentStateStorage, getItemInfo, ID } from '@vkontakte/mini-apps-analytics';

export const useItemRef = <T extends HTMLElement>(id: ID): MutableRefObject<T | null> => {
  const itemRef = useRef<T>(null);

  /** Собираем данные на основе дата-аттрибутов с элемента внутри блока */
  useEffect(() => {
    if (!itemRef.current) {
      return;
    }

    const itemInfo = getItemInfo(null, itemRef.current);

    /**
     * При обновлении страницы всплывают от чайлда к родителю, что приводит к тому, что, на момент
     * регистрации айтемов, соответствующий блок еще не зарегистрирован. Чтобы обойти ограничение реакта
     * смещаем вызов колбека на след тик
     */
    setTimeout(() => {
      CurrentStateStorage.addItemByBlockId(id.toString(), {
        id: itemInfo.actionElementId,
        name: itemInfo.actionElementName,
      });
    }, 0);
  }, [itemRef.current]);

  return itemRef;
};
