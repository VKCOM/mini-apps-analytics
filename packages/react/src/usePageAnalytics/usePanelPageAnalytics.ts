import {useContext, useLayoutEffect} from 'react';

import {CurrentStateStorage, PageStateData} from "@vkontakte/mini-apps-analytics";
import {analyticsContext} from "../context";

export const usePanelPageAnalytics = (panelPageName: string, modalPageName: string | null | 0, deps: string[] = []) => {
  const { storedKeys } = useContext(analyticsContext);

  /**
   * Очищаем ранее собранную информацию по странице и инициируем новый сбор данных для страницы
   */
  useLayoutEffect(() => {
    if (modalPageName || modalPageName === 0) {
      return;
    }

    const source = CurrentStateStorage.getValue('screenName');
    CurrentStateStorage.setPage(panelPageName, storedKeys);
    CurrentStateStorage.addPlainData<'source'>('source', source);
  }, [panelPageName, modalPageName, storedKeys, ...deps]);

  return panelPageName;
};
