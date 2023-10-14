import { CustomData, PageData } from '../types';

/** Аналитическая информация на странице */
export type PageStateData = PageData & Partial<CustomData>;

export type PlainDataKey = Exclude<keyof PageStateData, 'blocks' | 'screenName'>;
