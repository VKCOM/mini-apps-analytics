import { CurrentStateStorage } from '@vkontakte/mini-apps-analytics';
import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { analyticsContext } from '../context';
import { useModalPageAnalytics } from './useModalPageAnalytics';
import { usePanelPageAnalytics } from './usePanelPageAnalytics';

export type UsePageAnalyticsParams = {
  /**
   * Имя текущей модальной страницы. При изменении
   *
   * - вызывается событие screen_open;
   * - сбрасыватеся CurrentStateStorage.data;
   * - устанавливается соответствующее значение CurrentStateStorage.data.screenName;
   *
   * 0 - системное значение, говорящее о том, что не надо учитывать эту модалку в потоке изменения экранов
   *
   */
  modalPageName: string | null | 0;
  /**
   * Имя текущей панели. При изменении
   *
   * - вызывается событие screen_open;
   * - сбрасыватеся CurrentStateStorage.data;
   * - устанавливается соответствующее значение CurrentStateStorage.data.screenName;
   */
  panelPageName: string;
  /**
   * Значения, при которых панель/модальная страница остаются неизменными (меняется только контент).
   * Пример использования. Страница с различными табами навигации: панель остается неизменной, но рендерится новая страница
   *
   */
  pageDeps?: string[];
  /**
   * Значения, при которых необходимо очистить CurrentStateStorage.data
   * Пример использования. Динамическое изменение фильтров на странице должно инициировать новую регистрацию существующих
   * элементов на странице, но не должно инициировать смену страницы
   *
   */
  cleanUpDeps?: string[];
};

const defaultDeps: string[] = [];

/**
 * Хелпер для отслеживания текущего состояния страницы, при навигации по приложению.
 *
 * - сохраняет launchUrl в CurrentStateStorage.data на основе window.location.href (удаляет параметры access_token, vk_access_token_settings и sign);
 * - сохраняет source в CurrentStateStorage.data на основе window.location.href.searchParams.get('vkRef') (удаляет параметры access_token, vk_access_token_settings и sign);
 * - регистрирует screenOpenEventService.registerScreenListener при смене страницы
 * - при изменении зависимостей cleanUpDeps вызывает CurrentStateStorage.cleanUp
 *
 */
export const usePageAnalytics = (
  { panelPageName, modalPageName, pageDeps = defaultDeps, cleanUpDeps = defaultDeps }: UsePageAnalyticsParams,
  isAppReady = true
) => {
  const { screenOpenEventService } = useContext(analyticsContext);
  const url = useMemo(() => new URL(window.location.href), []);
  const vkRef = url.searchParams.get('vk_ref');

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

  useModalPageAnalytics(currentModalPageName, pageDeps);
  usePanelPageAnalytics(panelPageName, currentModalPageName, pageDeps);

  /** Регистрируем слушателя открытия страница */
  useLayoutEffect(() => {
    const screenOpenInterval = screenOpenEventService.registerScreenListener();

    return () => {
      /** Очищаем интервал, если страница не была до конца загружена, но пользователь уже перешел на другую */
      clearInterval(screenOpenInterval);
    };
  }, [panelPageName, currentModalPageName, screenOpenEventService, ...pageDeps]);

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
  }, [panelPageName, isAppReady, currentModalPageName, ...pageDeps]);

  useEffect(() => {
    if (isAppReady) {
      CurrentStateStorage.registerExistingValues(currentModalPageName !== null);
      CurrentStateStorage.cleanUp();
    }

    return () => {
      CurrentStateStorage.cleanUp();
    };
  }, [cleanUpDeps, currentModalPageName]);
};
