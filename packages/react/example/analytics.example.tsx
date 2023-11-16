import {
  ClickEventService,
  CurrentStateStorage,
  dataBlockLoading,
  getBlockParameters,
  getItemParameters,
  LaunchEventService,
  ScreenOpenEventService,
  setUpAnalyticsStorage,
  setupOnEventSend,
  ShowEventService,
} from '@vkontakte/mini-apps-analytics';
import {
  analyticsContext,
  AnalyticsContextValue,
  useAddPlainData,
  useBlockRef,
  useInitLaunchAnalyticsValues,
  useLaunchAnalytics,
  useItemRef,
  usePageAnalytics,
  UsePageAnalyticsParams,
} from '@vkontakte/mini-apps-analytics-react';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

/*
* В случае Typescript v5+
* import '@vkontakte/mini-apps-analytics/dist/types/src/types/common';
* declare module '@vkontakte/mini-apps-analytics/dist/types/src/types/common' {...}
*
* */

declare module '@vkontakte/mini-apps-analytics' {
   export interface CustomData {
   myAwesomeStringAppData: string;
   myAwesomeNumberAppData: number;
   showData: { value: 'showValue' };
   }
}

/** Настройка конфигурации ShowEventService'a для реагирования на show событие */
const showEventService = new ShowEventService(() => {
  return {
    blocks: CurrentStateStorage.data.blocks,
    showData: CurrentStateStorage.data.showData,
  };
});

/** Настройка конфигурации ScreenOpenEventService'a для реагирования на событие перехода по страницам */
const screenOpenEventService = new ScreenOpenEventService(
  () =>
    /** Отправляем все данные по странице. */
    CurrentStateStorage.data
);

/** Настройка конфигурации LaunchEventService'a для отправки события launch */
const launchEventService = new LaunchEventService(() => CurrentStateStorage.data);

const contextValue: AnalyticsContextValue = {
  isShowElementEventActive: true,
  showEventService,
  screenOpenEventService,
  launchEventService,
};

setUpAnalyticsStorage({
  modalRootSelector: '.vkuiModalRoot',
  panelSelectors: [`.vkuiView__panel--active`, `.vkuiView__panel.vkuiView__panel--next`],
  /*
   * При переходе по страницам и вызове метода CurrentStateStorage.cleanUp, данные для myAwesomeStringAppData не будут утеряны.
   * Доступны ключи хранилища CurrentStateStorage.data, в том числе и 'myAwesomeStringAppData'/'myAwesomeNumberAppData'/'showData'
   */
  storedKeys: ['myAwesomeStringAppData'],
});

const AppWrapper: React.FC<PropsWithChildren> = (props) => {
  /** Пример записи в CurrentStateStorage */
  useAddPlainData('myAwesomeStringAppData', 'asdasd');
  // useAddPlainData('myAwesomeStringAppData', 123123); // TypeError
  useAddPlainData('myAwesomeNumberAppData', 12312);
  // useAddPlainData('myAwesomeNumberAppData', 'asdasd'); // TypeError

  /** Пример чтения из CurrentStateStorage */
  const stringData: string = CurrentStateStorage.data.myAwesomeStringAppData;
  const numberData: number = CurrentStateStorage.data.myAwesomeNumberAppData;
  // const anyOtherData: number = CurrentStateStorage.data.anyValue; // property 'anyValue' does not exist

  const context = useMemo(
    () => ({
      ...contextValue,
    }),
    []
  );
  return <analyticsContext.Provider value={context}>{props.children}</analyticsContext.Provider>;
};

/** Инициализация слушателя для tap события */
const useTapAnalytics = () => {
  /** Регистрируем глобально сервис аналитики для tap события */
  useEffect(() => {
    const tapService = new ClickEventService(() => {
      return {
        blocks: CurrentStateStorage.data.blocks,
        /** Отправляем ТОЛЬКО нужные данные для tap события */
        myAwesomeNumberAppData: CurrentStateStorage.data.myAwesomeNumberAppData,
      };
    });

    return () => {
      /** При анмаунте отписываемся от click слушателя на document'е */
      tapService.onDestroy();
    };
  }, []);
};

/**/
const useSetupAnalytics = () => {
  const panelPageName = 'panelPageName'; // Вычисляемое, в рамках приложения, значение
  const modalPageName = 'modalPageName'; // Вычисляемое, в рамках приложения, значение
  const pageDeps: UsePageAnalyticsParams['pageDeps'] = [];
  const cleanUpDeps: UsePageAnalyticsParams['cleanUpDeps'] = [];

  const analyticsConfig: UsePageAnalyticsParams = useMemo(
    () => ({ panelPageName, modalPageName, pageDeps, cleanUpDeps }),
    [panelPageName, modalPageName, pageDeps, cleanUpDeps]
  );

  /** Собираем launch и source параметры на старте приложения */
  useInitLaunchAnalyticsValues();
  useLaunchAnalytics();
  usePageAnalytics(analyticsConfig);
  useTapAnalytics();
};

const Content = () => {
  /** Эмулируем состояние загрузки приложения */
  const [isLoading, setIsLoading] = useState(true);
  useSetupAnalytics();

  const blockRef = useBlockRef<HTMLDivElement>();
  const itemRef = useItemRef<HTMLDivElement>('blockId');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    /**
     * Устанавливаем соответствующий data-атрибут для ScreenOpen сервиса. Если на странице не будет ни одного соответствующего
     * data-атрибута, слушатель ScreenOpen сервиса воспримет это, как полностью загруженную страницу и инициализирует
     * отправку события screen_open
     */
    return <div {...{ [dataBlockLoading]: true }}></div>;
  }

  return (
    <div
      ref={blockRef}
      {...getBlockParameters({
        id: 'blockId',
        entityType: 'customEntityType',
      })}
    >
      <div ref={itemRef} {...getItemParameters('customItemId')}>
        item content
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppWrapper>
      <Content />
    </AppWrapper>
  );
};

/**
 * По умолчанию метод send установлен в работу с console.log.
 * Пример маппинга данных под любой необходимый формат и утсановке кастомного колбека на отправку событий
 */
setupOnEventSend((eventData) => {
  const data = {
    blocks: eventData.blocks,
    stringData: eventData.myAwesomeStringAppData,
    numberValue: eventData.myAwesomeNumberAppData,
  };

  /** Используем любой доступный способ отправки события. fetch взят для примера */
  fetch('/api/analytics', { method: 'post', body: JSON.stringify(data) });
});


const runApp = () => {
  const root = document.getElementById('root');

  if (root) {
    createRoot(root).render(<App />);
  }
};

runApp();
