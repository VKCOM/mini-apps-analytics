import {useContext, useLayoutEffect} from 'react';
import {CurrentStateStorage} from '@vkontakte/mini-apps-analytics';
import {analyticsContext} from "../context";

export const useModalPageAnalytics = (modalPageName: string | null, deps: string[] = []) => {
  const { storedKeys } = useContext(analyticsContext);

  /**
   * Очищаем ранее собранную информацию по странице и инициируем новый сбор данных для страницы
   */
  useLayoutEffect(() => {
    if (!modalPageName) {
      return;
    }

    const source = CurrentStateStorage.getValue('screenName');

    CurrentStateStorage.setPage(modalPageName, storedKeys);
    CurrentStateStorage.addPlainData<'source'>('source', source);
  }, [modalPageName, storedKeys, ...deps]);
};
