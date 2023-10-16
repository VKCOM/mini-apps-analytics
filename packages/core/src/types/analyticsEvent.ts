import { CustomData } from './common';
import { CommonEventData } from './eventData';
import { PageData } from './pageState';

/** Вся собираемая аналитическая информация о странице */
export type AnalyticsEvent = CommonEventData & Partial<PageData> & CustomData;
