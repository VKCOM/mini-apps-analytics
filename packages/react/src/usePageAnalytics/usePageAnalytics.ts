import { CurrentStateStorage } from '@vkontakte/mini-apps-analytics';
import { DependencyList, useContext, useEffect, useRef } from 'react';

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
  pageDeps?: DependencyList;
  /**
   * Значения, при которых необходимо очистить CurrentStateStorage.data
   * Пример использования. Динамическое изменение фильтров на странице должно инициировать новую регистрацию существующих
   * элементов на странице, но не должно инициировать смену страницы
   *
   */
  cleanUpDeps?: DependencyList;
};

const defaultDeps: DependencyList = [];

/**
 * Хелпер для отслеживания текущего состояния страницы, при навигации по приложению.
 *
 * - регистрирует analyticsContext -> screenOpenEventService.registerScreenListener при смене страницы
 * - при изменении зависимостей cleanUpDeps вызывает CurrentStateStorage.cleanUp
 *
 */
export const usePageAnalytics = (
  { panelPageName, modalPageName, pageDeps = defaultDeps, cleanUpDeps = defaultDeps }: UsePageAnalyticsParams,
  isAppReady = true
) => {
  const { screenOpenEventService } = useContext(analyticsContext);

  const lastModalRef = useRef<string | null>(null);

  /** 0 - системное значение, говорящее о том, что не надо учитывать эту модалку в потоке изменения экранов */
  if (modalPageName !== 0) {
    lastModalRef.current = modalPageName;
  }

  const currentModalPageName = lastModalRef.current;

  useModalPageAnalytics(currentModalPageName, pageDeps);
  usePanelPageAnalytics(panelPageName, currentModalPageName, pageDeps);

  /** Регистрируем слушателя открытия страницы */
  useEffect(() => {
    const screenOpenInterval = screenOpenEventService.registerScreenListener();

    return () => {
      /** Очищаем интервал, если страница не была до конца загружена, но пользователь уже перешел на другую */
      clearInterval(screenOpenInterval);
    };
  }, [panelPageName, currentModalPageName, screenOpenEventService, ...pageDeps]);

  /**
   * При старте приложения и смене роута регистрируем доступные на странице блоки.
   * Смотрим на isReady если есть динамическая составляющая приложения, которая должна проинициализироваться
   */
  useEffect(() => {
    if (isAppReady) {
      /*
       * Смещаем установку данных по странице на следующий тик, иначе информация о странице обнулится раньше,
       * чем отработает обработчик tap события
       */
      setTimeout(() => CurrentStateStorage.registerExistingValues(currentModalPageName !== null), 0);
    }

    return () => {
      /*
       * Смещаем установку данных по странице на следующий тик, иначе информация о странице обнулится раньше,
       * чем отработает обработчик tap события
       */
      setTimeout(() => CurrentStateStorage.cleanUp(), 0);
    };
  }, [panelPageName, isAppReady, currentModalPageName, ...pageDeps]);

  useEffect(() => {
    if (isAppReady) {
      /*
       * Смещаем установку данных по странице на следующий тик, иначе информация о странице обнулится раньше,
       * чем отработает обработчик tap события
       */
      setTimeout(() => CurrentStateStorage.registerExistingValues(currentModalPageName !== null), 0);
    }

    return () => {
      /*
       * Смещаем установку данных по странице на следующий тик, иначе информация о странице обнулится раньше,
       * чем отработает обработчик tap события
       */
      setTimeout(() => CurrentStateStorage.cleanUp(), 0);
    };
  }, [cleanUpDeps, currentModalPageName]);
};
