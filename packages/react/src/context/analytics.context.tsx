import { CurrentStateStorage, ScreenOpenEventService, ShowEventService } from '@vkontakte/mini-apps-analytics';
import React from 'react';

export type AnalyticsContextValue = {
  /**
   * Флаг для отключения срабатывания show события внутри useElementShowRef.
   * Необходим, например, при открытии/закрытии модальных страниц - это событие считается полноценной
   * сменой страницы и события show должны отрабатывать заново, при закрытии модальной страницы, притом, что
   * открытие модальной страницы не влечет отпарвку события show
   *
   */
  isShowElementEventActive: boolean;
  /**
   * Инстанс класса ShowEventService. При передаче инстанса есть возможность сконфигурировать отправку show события
   * разными способами, настроив разные контексты react'a
   */
  showEventService: ShowEventService;
  /**
   * Инстанс класса ShowEventService. При передаче инстанса есть возможность сконфигурировать отправку screen_open события
   * разными способами, настроив разные контексты react'a
   */
  screenOpenEventService: ScreenOpenEventService;
};

const defaultValue: AnalyticsContextValue = {
  isShowElementEventActive: true,
  showEventService: new ShowEventService(() => CurrentStateStorage.data),
  screenOpenEventService: new ScreenOpenEventService(() => CurrentStateStorage.data),
};

export const analyticsContext = React.createContext<AnalyticsContextValue>(defaultValue);

export const AnalyticsContextProvider = analyticsContext.Provider;
