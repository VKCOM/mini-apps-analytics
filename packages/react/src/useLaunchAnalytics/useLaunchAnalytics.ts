import { useContext, useLayoutEffect } from 'react';

import { analyticsContext } from '../context';

/**
 * Хелпер для отслеживания launch события
 *
 * регистрирует analyticsContext -> launchEventService.registerScreenListener при старте приложения
 *
 */
export const useLaunchAnalytics = (isAppReady = true) => {
  const { launchEventService } = useContext(analyticsContext);

  /** Регистрируем слушателя открытия первой страницы на старте */
  useLayoutEffect(() => {
    if (!isAppReady) {
      return;
    }
    const launchEventInterval = launchEventService.registerScreenListener();

    return () => {
      /** Очищаем интервал, если страница не была до конца загружена, но пользователь уже перешел на другую */
      clearInterval(launchEventInterval);
    };
  }, [launchEventService, isAppReady]);
};
