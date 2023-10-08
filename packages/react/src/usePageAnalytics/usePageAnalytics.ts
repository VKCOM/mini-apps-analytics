import {useContext, useEffect, useLayoutEffect, useMemo, useRef} from 'react';
import {CurrentStateStorage, PageStateData, ScreenOpenEventService} from '@vkontakte/mini-apps-analytics';


import { useModalPageAnalytics } from './useModalPageAnalytics';
import { usePanelPageAnalytics } from './usePanelPageAnalytics';
import {analyticsContext} from "../context";

type Params = {
  modalPageName: string | null | 0;
  panelPageName: string;
  deps?: string[];
  screenOpenEventService: ScreenOpenEventService;
  storedKeys: Array<keyof PageStateData>
};

const defaultDeps: string[] = [];

export const usePageAnalytics = ({ panelPageName, modalPageName, deps = defaultDeps }: Params, isAppReady = true) => {
  const { storedKeys, screenOpenEventService } = useContext(analyticsContext);
  const url = useMemo(() => new URL(window.location.href), [])
  const vkRef = url.searchParams.get('vk_ref')

  /** При инициализации приложения устанавливаем launchUrl */
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('access_token');
    url.searchParams.delete('vk_access_token_settings');
    url.searchParams.delete('sign');
    CurrentStateStorage.addPlainData<'launchUrl'>('launchUrl', url.href);
  }, []);

  /** Бридж отадет launchParams в промисе, потому нужно обновить состояние реактивно по изменению launchParams  */
  useEffect(() => {
    if (vkRef && !CurrentStateStorage.getValue('source')) {
      CurrentStateStorage.addPlainData<'source'>('source', vkRef);
    }
  }, [vkRef]);

  const lastModalRef = useRef<string | null>(null);

  /** 0 - системное значение, говорящее о том, что не надо учитывать эту модалку в потоке изменения экранов */
  if (modalPageName !== 0) {
    lastModalRef.current = modalPageName;
  }

  const currentModalPageName = lastModalRef.current;

  useModalPageAnalytics(currentModalPageName, deps);
  usePanelPageAnalytics(panelPageName, currentModalPageName, deps);

  /** Регистрируем слушателя открытия страница */
  useLayoutEffect(() => {
    const screenOpenInterval = screenOpenEventService.registerScreenListener();

    return () => {
      /** Очищаем интервал, если страница не была до конца загружена, но пользователь уже перешел на другую */
      clearInterval(screenOpenInterval);
    };
  }, [panelPageName, currentModalPageName, screenOpenEventService, ...deps]);

  /**
   * При старте приложения и смене роута регистрируем доступные на странице блоки.
   * Смотрим на isReady для того, чтобы все динамические блоки из /api/config смогли проинициализироваться
   */
  useEffect(() => {
    if (isAppReady) {
      CurrentStateStorage.registerExistingValues(currentModalPageName !== null);
      CurrentStateStorage.cleanUp();
    }

    return () => {
      CurrentStateStorage.cleanUp();
    };
  }, [panelPageName, isAppReady, currentModalPageName, ...deps]);
};
