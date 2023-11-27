import { CurrentStateStorage } from '@vkontakte/mini-apps-analytics';
import { DependencyList, useLayoutEffect } from 'react';

export const useModalPageAnalytics = (modalPageName: string | null, deps: DependencyList = []) => {
  /**
   * Очищаем ранее собранную информацию по странице и инициируем новый сбор данных для страницы
   */
  useLayoutEffect(() => {
    if (!modalPageName) {
      return;
    }

    const source = CurrentStateStorage.getValue('screenName');

    CurrentStateStorage.setPage(modalPageName);
    CurrentStateStorage.addPlainData<'source'>('source', source);
  }, [modalPageName, ...deps]);
};
