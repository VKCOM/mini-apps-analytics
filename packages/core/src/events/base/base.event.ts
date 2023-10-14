import { AnalyticsEvent, CommonEventData } from '../../types';

type Params = {
  event: CommonEventData['event'];
  type: CommonEventData['type'];
};

type EventData = Omit<AnalyticsEvent, 'clientTime'> & { clientTime?: Date };

export type SendEvent = (eventData: EventData & Record<any, any>) => Promise<void> | void;

/**
 * @description Базовый класс события. Все события наследуются от него.
 * Определяет только сохранение параметров состояния и метод BaseEvent.prototype.send для обработки отправки события
 * */
export class BaseEvent {
  static sendEvent: SendEvent = (data) => {
    console.log(`--- event `, data.event, data);
    return Promise.resolve();
  };

  protected readonly params: Params;

  constructor(params: Params) {
    this.params = params;
  }

  /**
   * @description метод отправки события, вызываемый для всех дочерних классов
   * */
  send = (data: Omit<EventData, 'event' | 'type'>) => {
    const eventData = { ...this.params, clientTime: data.clientTime || new Date(), ...data };
    return BaseEvent.sendEvent(eventData);
  };
}

/**
 * @description Настройка функции срабатывания на событие
 */
export const setup = (sendEvent: SendEvent) => {
  BaseEvent.sendEvent = sendEvent;
};
