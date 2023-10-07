export type ID = string | number;

export type PageData = {
  /**
   * С какой страницы перешли (всегда внутренний роутинг или vk_ref)
   */
  source?: string;
  /** Начальный URL при старте приложения */
  launchUrl?: string;
  /**
   * screen_name - Где произошло событие, на каком экране приложения.
   * Для экранов категорий составной экран coupons_catalog или coupons_my_coupons
   */
  screenName?: string;
  /** Составное состояние страницы для более удобной локальной обработки данных. По отдельным полям смотреть информацию в документации в confluence   */
  blocks: Array<{ id: ID; items: ID[]; entityType?: string }>;

  actionBlockIndex?: number;
  actionBlockName?: string;
  actionBlockId?: string;
  actionElementIndex?: number;
  actionElementName?: string;
  actionElementId?: string;
  actionEntityType?: string;
};
