import { dataBlockIdKey, dataItemIdKey } from './dataAttributes';

type Predicate = (el: HTMLElement) => boolean;

export const lookParentByPredicateFactory = (predicate: Predicate) => {
  const lookForPredicateMatch = (element?: HTMLElement): HTMLElement | null => {
    if (!element) {
      return null;
    }

    if (predicate(element)) {
      return element;
    }

    const parent = element.parentElement;

    return parent ? lookForPredicateMatch(parent) : null;
  };

  return lookForPredicateMatch;
};

/** Хелпер для поиска блока (имеет значение по атрибуту  data-block-id), внутри которого находится передаваемый HTMLElement */
export const lookForContainerBlockElement = lookParentByPredicateFactory((el) => !!el.getAttribute(dataBlockIdKey));

/** Хелпер для поиска элемента (имеет значение по атрибуту data-item-id), внутри которого находится передаваемый HTMLElement */
export const lookForItemElement = lookParentByPredicateFactory((el) => !!el.getAttribute(dataItemIdKey));
