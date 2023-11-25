import { PageStateData } from '../../storage';
import { getBlockInfo, getItemInfo, lookForContainerBlockElement } from '../../utils';
import { BaseEvent } from '../base';

type Options = {
  /** @docs https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer */
  threshold?: number | number[];
};

const DEFAULT_OPTIONS: Options = {
  threshold: 0.7,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const constVoid = () => {};

export class ShowEventService extends BaseEvent {
  private readonly getPageData: () => PageStateData;

  constructor(getPageData: () => PageStateData) {
    super({ event: 'show', type: 'type_view' });
    this.getPageData = getPageData;
  }

  /**
   * Регистрирует IntersectionObserver на элементе, с заданными параметрами (по дефолту - {threshold: 0.7})
   * Возвращает функцию отключения наблюдения IntersectionObserver на элементе.
   * При показе элемента собирает информацию об элеменет (getItemInfo), блоке (getBlockInfo) и странице (this.getPageData),
   * вызывает
   *
   * this.send({
   *     ...this.getPageData(),
   *     ...getBlockInfo(...),
   *     ...getItemInfo(...),
   * })
   *
   * и отписывается от IntersectionObserver.
   *
   * Документация по inputOptions https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer
   *
   */
  register = <T extends HTMLElement>(elementRef: T, inputOptions: Options = DEFAULT_OPTIONS) => {
    const options: Options = { ...DEFAULT_OPTIONS, ...inputOptions };

    if (!elementRef) {
      return constVoid;
    }

    const blockEl = lookForContainerBlockElement(elementRef);

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]) {
        return;
      }

      if (entries[0].isIntersecting) {
        if (!blockEl) {
          return;
        }

        const pageData = this.getPageData();
        const { isBlockLeaf: _, ...blockData } = getBlockInfo(blockEl, pageData.blocks);
        const elementData = getItemInfo(blockEl, elementRef);

        this.send({
          ...pageData,
          ...blockData,
          ...elementData,
        });

        observer.disconnect();
      }
    }, options);

    observer.observe(elementRef);

    return () => {
      observer.disconnect();
    };
  };
}
