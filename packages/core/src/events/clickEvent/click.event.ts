import { PageStateData } from '../../storage';
import {
  dataEventTypeKey,
  dataTapEventValue,
  getBlockInfo,
  getItemInfo,
  lookForContainerBlockElement,
  lookParentByPredicateFactory,
} from '../../utils';
import { BaseEvent } from '../base';

const lookForTargetElement = lookParentByPredicateFactory(
  (el) => el.getAttribute(dataEventTypeKey) === dataTapEventValue
);

/** Класс-обработчик события tap(click) на странице */
export class ClickEventService extends BaseEvent {
  /**
   * Зарегистрированный при инициализации экземпляра event listener на всем document.
   * При событии click на странице проверяет, был ли установлен у targetElement data-атрибут
   * data-event-type="tap". Если был, проверяет, находится ли элемент внутри блока: есть ли у какого-либо родительского
   * элемента значение data-block-id. Если условия соблюдены, собирает информацию об элементы с помощью функций
   * getBlockInfo, getItemInfo и
   * this.send({
   *     ...this.getPageData(),
   *     ...getBlockInfo(...),
   *     ...getItemInfo(...),
   * })
   * NOTE: Заводим 2 отдельных листенера для отлова события на разных фазах (погружение/всплытие)
   */
  private readonly noCaptureListener: (e: MouseEvent) => void;
  private readonly captureListener: (e: MouseEvent) => void;

  getPageData: () => PageStateData;

  /** Удаляет this.noCaptureListener/this.captureListener из списка листенеро на document'е */
  onDestroy = () => {
    window.document.removeEventListener('click', this.noCaptureListener);
    window.document.removeEventListener('click', this.captureListener);
  };

  /**
   * При создании экземпляра класса добавляет this.listener на событие 'click' на document
   *
   */
  constructor(getPageData: () => PageStateData) {
    super({ event: 'tap', type: 'type_click' });
    this.getPageData = getPageData;
    const getListener = (useCapture: boolean) => (e: MouseEvent) => {
      const targetItem = lookForTargetElement(e.target as HTMLElement);

      if (targetItem) {
        const block = lookForContainerBlockElement(targetItem);

        if (block) {
          const pageData = this.getPageData();
          const blockData = getBlockInfo(block, pageData.blocks);
          const elementData = getItemInfo(block, targetItem);

          if (elementData.eventUseCapture !== useCapture) {
            return;
          }

          this.send({
            ...pageData,
            ...blockData,
            ...elementData,
          });
        }
      }
    };

    this.noCaptureListener = getListener(false);
    this.captureListener = getListener(true);

    window.document.addEventListener('click', this.noCaptureListener, false);
    window.document.addEventListener('click', this.captureListener, true);
  }
}
