import React from 'react';
import {
    CurrentStateStorage,
    PageStateData,
    ScreenOpenEventService,
    ShowEventService
} from "@vkontakte/mini-apps-analytics";

export type AnalyticsContextValue = {
  showEventService: ShowEventService;
  storedKeys: Array<keyof PageStateData>;
  screenOpenEventService: ScreenOpenEventService;
};

const defaultValue: AnalyticsContextValue = {
  showEventService: new ShowEventService(() => CurrentStateStorage.data),
  screenOpenEventService: new ScreenOpenEventService(() => CurrentStateStorage.data),
  storedKeys: [],
};

export const analyticsContext = React.createContext<AnalyticsContextValue>(defaultValue);

export const AnalyticsContextProvider = analyticsContext.Provider;
