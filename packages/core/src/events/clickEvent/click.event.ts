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

export class ClickEventService extends BaseEvent {
  private readonly listener: (e: MouseEvent) => void;

  getPageData: () => PageStateData;

  onDestroy = () => {
    window.removeEventListener('click', this.listener);
  };

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
