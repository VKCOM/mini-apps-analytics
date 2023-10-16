import { CurrentStateStorage } from '@vkontakte/mini-apps-analytics';
import { useLayoutEffect } from 'react';

export const usePanelPageAnalytics = (panelPageName: string, modalPageName: string | null | 0, deps: string[] = []) => {
  /**
   * Очищаем ранее собранную информацию по странице и инициируем новый сбор данных для страницы
   */
  useLayoutEffect(() => {
    if (modalPageName || modalPageName === 0) {
      return;
    }

    const source = CurrentStateStorage.getValue('screenName');
    CurrentStateStorage.setPage(panelPageName);
    CurrentStateStorage.addPlainData<'source'>('source', source);
  }, [panelPageName, modalPageName, ...deps]);

  return panelPageName;
};
