import { dataBlockLoading } from '../utils/dataAttributes';

export type ResourceLoadInfo = {
  /** Основной путь до ресурса, не включая search параметры запроса */
  resource?: string;
  /** Полный путь до ресурса, включая search параметры */
  resourcePath: string;
  /** Search параметры запроса */
  resourceParams?: string;
  /** Общее время запроса (ttfb + download_time) */
  totalTime: number;
  /** Тип загружаемого ресурса */
  type: string;
  /**
   * Time To First Byte. Для корректной работы вычисления этого поля, ответ от бекенда должен содержать заголовок Timing-Allow-Origin.
   * В случае, если заголовок Timing-Allow-Origin отсутсвтует, или не соответствует домену, значение ttfb будет иметь значение 0
   */
  ttfb: number;
  /** Время исполнения запроса после получения первого байта */
  downloadTime: number;
};

/**
 * Запускает PerformanceObserver для всех ресурсов на странице.
 * Вычисляет основные метрики (resource/resourcePath/totalTime/ttfb/downloadTime),
 * необходимые для анализа быстродействия загрузки страницы.
 * Отписывается от инстанса PerformanceObserver'a, как только на странице не осталось ни одного элемента с аттрибутом
 * data-block-is-loading-content==="true".
 * При выполнении запроса вызывает коллбек с информацией по данному запросу
 *
 * @note Для корректного вычисления значения ttfb для запроса, API должен возвращать соответствующий заголовок Timing-Allow-Origin
 *
 * @returns функция для отписки от PerformanceObserver
 *
 * @example
 * import React from 'react';
 * import { networkRequestsAnalytics } from '@vkontakte/mini-apps-analytics';
 *
 * const App = () => {
 *  // Инициируем сбор информации о выполняемых запросах на старте приложения
 *  useEffect(() => {
 *    const cleanUpNetworkPerformanceAnalytics = networkRequestsAnalytics(console.log);
 *
 *    import('web-vitals').then(({ onLCP }) => {
 *      // Отписываемся от сбора информации о времени запросов
 *      onLCP((values) => {
 *        cleanUpNetworkPerformanceAnalytics();
 *      });
 *    }
 *
 *    return () => { cleanUpNetworkPerformanceAnalytics(); }
 *  }, []);
 * }
 */
export const networkRequestsAnalytics = (onResourceLoaded: (resource: ResourceLoadInfo) => void) => {
  const perfObserver = new PerformanceObserver((entryList) => {
    const resources = entryList.getEntriesByType('resource');

    const data = resources.map((resource) => {
      // @ts-ignore
      const ttfb = resource.responseStart ? resource.responseStart - resource.requestStart : 0;
      const downloadTime = resource.duration - ttfb;
      // @ts-ignore
      const type = resource.initiatorType || 'resource';

      let path: URL;
      try {
        path = new URL(resource.name);
        return {
          resource: path.origin + path.pathname,
          resourcePath: resource.name,
          resourceParams: path.search,
          totalTime: resource.duration,
          type,
          ttfb,
          downloadTime,
        };
      } catch (_) {
        return {
          resource: undefined,
          resourcePath: resource.name,
          resourceParams: undefined,
          totalTime: resource.duration,
          type,
          ttfb,
          downloadTime,
        };
      }
    });

    data.forEach((dataItem) => {
      onResourceLoaded(dataItem);
    });
  });

  perfObserver.observe({
    type: 'resource',
    buffered: true,
  });

  let timeout: number;
  /** Создаем интервалом на случай, если LCP не отрабатывает у пользователя. Например IOS устройства */
  const interval = setInterval(() => {
    if (!document.querySelector(`[${dataBlockLoading}=true]`)) {
      clearInterval(interval);

      timeout = setTimeout(() => {
        perfObserver.disconnect();
      }, 1000);
    }
  }, 1000);

  return () => {
    perfObserver.disconnect();
    clearInterval(interval);
    clearTimeout(timeout);
  };
};
