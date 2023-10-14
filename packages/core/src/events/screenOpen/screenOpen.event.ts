import {PageStateData} from '../../storage';
import { dataBlockLoading } from '../../utils';
import { BaseEvent } from '../base';

export class ScreenOpenEventService extends BaseEvent {
  private readonly getPageData: () => PageStateData;
  constructor(getPageData: () => PageStateData) {
    super({ event: 'screen_open', type: 'type_navgo' });
    this.getPageData = getPageData;
  }

  /** Регистрирует интервал для проверки наличия на странице элементов с data-аттрибутом dataBlockLoading="true".
   * В случае, если таких элементов на странице не существует вызывает метод отправки события
   * this.send({ ...this.getPageData(), clientTime: time });
   *  */
  registerScreenListener = () => {
    let time = new Date();
    const interval = setInterval(() => {
      const isLoadingExists = document.body.querySelector(`[${dataBlockLoading}="true"]`) !== null;

      if (!isLoadingExists) {
        clearInterval(interval);
        this.send({ ...this.getPageData(), clientTime: time });
      }
      time = new Date();
    }, 500);
    return interval;
  };
}

