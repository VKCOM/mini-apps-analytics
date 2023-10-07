import { AnalyticsEvent, CommonEventData } from '../../types';

type Params = {
  event: CommonEventData['event'];
  type: CommonEventData['type'];
};

type EventData = Omit<AnalyticsEvent, 'clientTime'> & { clientTime?: Date };

export type SendEvent = (eventData: EventData & Record<any, any>) => Promise<void> | void;

export class BaseEvent {
  static sendEvent: SendEvent = (data) => {
    console.clear();
    console.log(`--- event `, data.event, data);
    return Promise.resolve();
  };

  protected readonly params: Params;

  constructor(params: Params) {
    this.params = params;
  }

  send = (data: Omit<EventData, 'event' | 'type'>) => {
    const eventData = { ...this.params, clientTime: data.clientTime || new Date(), ...data };
    return BaseEvent.sendEvent(eventData);
  };
}

export const setup = (sendEvent: SendEvent) => {
  BaseEvent.sendEvent = sendEvent;
};
