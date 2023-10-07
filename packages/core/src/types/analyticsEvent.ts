import { CustomData } from './common';
import { CommonEventData } from './eventData';
import { PageData } from './pageState';

export type AnalyticsEvent = CommonEventData & Partial<PageData> & CustomData;
