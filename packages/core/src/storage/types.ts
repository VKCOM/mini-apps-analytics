import { CustomData, PageData } from '../types';

export type PageStateData = PageData & Partial<CustomData>;

export type PlainDataKey = Exclude<keyof PageStateData, 'blocks' | 'screenName'>;
