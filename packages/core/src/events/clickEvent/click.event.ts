import { PageStateData } from '../../storage';
import {
  dataEventTypeKey,
  dataTapEventValue,
  getBlockInfo,
  getItemInfo,
  lookForContainerBlockElement,
} from '../../utils';
import { BaseEvent } from '../base';

const lookForTargetElement = (checkingElement: HTMLElement): HTMLElement | null => {
  const value = checkingElement.getAttribute(dataEventTypeKey);

  if (value !== null) {
    if (value === dataTapEventValue) {
      return checkingElement;
    } else {
      return null;
    }
  }

  if (checkingElement.parentElement) {
    return lookForTargetElement(checkingElement.parentElement);
  }

  return null;
};

/** Класс-обработчик события tap(click) на странице */
export class ClickEventService extends BaseEvent {
  /**
   * Зарегистрированный при инициализации экземпляра event listener на всем document.
   * При событии click на странице проверяет, был ли установлен у targetElement data-атрибут
   * data-event-type="tap". Если был, проверяет, находится ли элемент внутри блока: есть ли у какого-либо родительского
   * элемента значение data-block-id. Если условия соблюдены, собирает информацию об элементы с помощью функций
   * getBlockInfo, getItemInfo и
   * this.send({
   *     ...getBlockInfo(...),
   *     ...this.getPageData(),
   *     ...getItemInfo(...),
   * })
   *
   */
  private readonly listener: (e: MouseEvent) => void;

  getPageData: () => PageStateData;

  /* Удаляет this.listener с document */
  onDestroy = () => {
    window.document.removeEventListener('click', this.listener);
  };

  /**
   * При создании экземпляра класса добавляет this.listener на событие 'click' на document
   *
   */
  constructor(getPageData: () => PageStateData) {
    super({ event: 'tap', type: 'type_click' });
    this.getPageData = getPageData;

    this.listener = (e: MouseEvent) => {
      const targetItem = lookForTargetElement(e.target as HTMLElement);

      if (targetItem) {
        const block = lookForContainerBlockElement(targetItem);

        if (block) {
          const pageData = this.getPageData();
          const blockData = getBlockInfo(block, pageData.blocks);
          const elementData = getItemInfo(block, targetItem);

          this.send({
            ...elementData,
            ...pageData,
            ...blockData,
          });
        }
      }
    };

    window.document.addEventListener('click', this.listener, true);
  }
}
