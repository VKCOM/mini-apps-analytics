/**
 * Внутри пакета интерфейс CustomData пустой. Для того, чтобы была возможность расширить финальный тип информации о странице
 * ([PageStateData](../README.md#pagestatedata)) данными, специфичными для Вашего приложение оставлена возможность доопределить интерйефс CustomData
 * стандартными инструментами TypeScript - с помощью практики module augmentation:
 * @example
 * import { setupOnEventSend } from '@vkontakte/mini-apps-analytics';
 * declare module '@vkontakte/mini-apps-analytics' {
 *     export interface CustomData {
 *         myAwesomeValue: string
 *     }
 * }
 *
 * setupOnEventSend((eventData) => {
 *  type MyAwesomeValueType = (typeof eventData)['myAwesomeValue'] // string
 *  type UnknownValueType = (typeof eventData)['anyFieldYouWant'] // Compilation Error
 * })
 *
 * @example
 * // При использовании Typescript v5+ может потребоваться доопределение модуля по прямому пути
 * import '@vkontakte/mini-apps-analytics/dist/types/src/types/common';
 * // Важно доопределять конкретный файл
 * declare module '@vkontakte/mini-apps-analytics/dist/types/src/types/common' {
 *     export interface CustomData {
 *         myAwesomeValue: string
 *     }
 * }
 *
 */
/* Эксопртируем пустой интерфейс для дальнейшего расширения с помощью module augmentation */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface CustomData {}
