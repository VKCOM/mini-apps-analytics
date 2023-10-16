import { CurrentStateStorage } from '@vkontakte/mini-apps-analytics';
import { useLayoutEffect } from 'react';

export const useModalPageAnalytics = (modalPageName: string | null, deps: string[] = []) => {
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
