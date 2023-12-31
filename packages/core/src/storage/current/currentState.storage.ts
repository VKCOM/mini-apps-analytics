import { ID } from '../../types';
import { dataBlockIdKey, dataItemIdKey, storedValueTypeKey, storedValueValueKey } from '../../utils';
import { PageStateData, PlainDataKey } from '../types';

const getDefaultData = (): PageStateData => ({
  blocks: [],
});

const call = (fn: VoidFunction) => {
  /** Смещаем на следующий тик, из-за работы роутера + VKUI + возможные редиректы по диплинкам */
  setTimeout(fn, 300);
};

const defaultMapStoredKeys = <K extends keyof PageStateData>(
  dataKey: K,
  value: string
): PageStateData[K] | undefined => {
  return (value || undefined) as PageStateData[K];
};

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CurrentStateStorage {
  static data: PageStateData = getDefaultData();

  /** Ключи значений в хранилище, которые сохраняются даже после вызова методов CurrentStateStorage.cleanUp и CurrentStateStorage.setPage */
  static storedKeys: Array<keyof PageStateData> = [];

  /**
   * Метод для установки значения screenName.
   *  При вызове:
   *
   *  - устанавливает переданный screenName
   *  - обнуляет хранимое значение CurrentStateStorage.data, при этом
   *  - сохраняет значение launchUrl
   *  - сохраняет ранее записанные данные для значений, указанных в CurrentStateStorage.storeKeys
   *
   */
  static setPage = (screenName: string) => {
    const newData: PageStateData = {
      ...getDefaultData(),
      launchUrl: CurrentStateStorage.data.launchUrl,
      screenName,
    };

    (CurrentStateStorage.storedKeys || []).forEach((key) => {
      // @ts-ignore
      newData[key] = CurrentStateStorage.data[key];
    });

    CurrentStateStorage.data = {
      ...newData,
    };
  };

  /** Устанавливает значение по заданному ключу(field) в CurrentStateStorage.data[field] */
  static addPlainData = <K extends PlainDataKey>(field: K, value: PageStateData[K]) => {
    CurrentStateStorage.data[field] = value;
  };

  /**
   * Добавляет информацию о переданном блоке в CurrentStateStorage.data.block.
   *  Если блок с таким id уже зарегистрирован, дважды блок добавлен не будет
   */
  static registerBlock = (block: { id: ID; name?: string; entityType?: string; items?: ID[] }) => {
    if (CurrentStateStorage.data.blocks.findIndex(({ id }) => id === block.id) !== -1) {
      return;
    }

    CurrentStateStorage.data.blocks.push({ ...block, items: block.items || [] });
  };

  /** Удаляет блок из общего хранилища */
  static removeBlockById = (blockId: ID) => {
    CurrentStateStorage.data.blocks = CurrentStateStorage.data.blocks.filter((block) => block.id !== blockId);
  };

  /** Очищает информацию об элементах внутри блока */
  static cleanUpBlockById = (blockId: ID) => {
    const targetBlock = CurrentStateStorage.data.blocks.find((block) => block.id === blockId);
    if (targetBlock) {
      targetBlock.items = [];
    }
  };

  /**
   * Добавляет информацию в CurrentStateStorage.data.block[blockId] об элементе.
   * Если в блоке уже существует такой элемент, дважды элемент добавлен не будет
   */
  static addItemByBlockId = (blockId: ID, item: { id: ID; name?: string }) => {
    const block = CurrentStateStorage.data.blocks.find(({ id }) => id === blockId);

    if (!block || block.items.includes(item.id)) {
      return;
    }

    block.items.push(item.id);
  };

  /** @returns Текущее значение в хранилище данных CurrentStateStorage.data[key] */
  static getValue = <K extends Exclude<keyof PageStateData, 'blocks'>>(key: K) => {
    return CurrentStateStorage.data[key];
  };

  /**
   * Метод для сброса текущих значений в CurrentStateStorage.data.
   *  При вызове:
   *
   *  - обнуляет хранимое значение CurrentStateStorage.data, при этом
   *  - сохраняет значение launchUrl
   *  - сохраняет ранее записанные данные для значений, указанных в CurrentStateStorage.storeKeys
   *
   */
  static cleanUp = () => {
    CurrentStateStorage.data.blocks = [];
    const newData: PageStateData = {
      ...getDefaultData(),
      screenName: CurrentStateStorage.data.screenName,
      source: CurrentStateStorage.data.source,
      launchUrl: CurrentStateStorage.data.launchUrl,
    };

    (CurrentStateStorage.storedKeys || []).forEach((key) => {
      // @ts-ignore
      newData[key] = CurrentStateStorage.data[key];
    });

    CurrentStateStorage.data = {
      ...newData,
    };
  };

  static mapStoredValues = defaultMapStoredKeys;

  /** Селектор корневого элемента панели, откуда будут собираться данные */
  static panelSelectors: string[] = [];

  static getSelectorFromActivePanel = (searchSelector: string) =>
    CurrentStateStorage.panelSelectors
      .reduce((acc, panelSelector) => `${acc}, ${panelSelector} ${searchSelector}`, '')
      /** Из-за склейки в редьюсе получается лишние ", " в самом начале. Избавляемся от некорректной части CSS селектора */
      .slice(2);

  /** Селектор корневого элемента модальной страницы, откуда будут собираться данные */
  static modalRootSelector = `.vkuiModalRoot`;

  /**
   * Собирает существующую информацию на странице на основе data-атрибутов (см. документацию по поддерживаемым data-атрибутам )
   *
   * @param shouldLookIntoModal - собирать ли инфомарцию по странице в панели или в модальной странице
   *
   */
  static registerExistingValues = (shouldLookIntoModal?: boolean) => {
    call(() => {
      const panelBlocksSelectors = CurrentStateStorage.getSelectorFromActivePanel(`[${dataBlockIdKey}]`);

      const pageBlocks = document.querySelectorAll<HTMLElement>(panelBlocksSelectors);
      const modalBlocks = document.querySelectorAll<HTMLElement>(
        `${CurrentStateStorage.modalRootSelector} [${dataBlockIdKey}]`
      );
      const targetElementToSearchFrom = shouldLookIntoModal ? modalBlocks : pageBlocks;

      const blocksArray = Array.from(targetElementToSearchFrom)
        .map((item) => {
          const staticItems = Array.from(item.querySelectorAll<HTMLElement>(`[${dataItemIdKey}]`));
          return {
            id: item.dataset.blockId,
            entityType: item.dataset.entityType,
            name: item.dataset.blockName,
            items:
              item.dataset.blockIsLeaf === 'true'
                ? [item.dataset.blockId]
                : staticItems.map((staticItem) => staticItem.dataset.itemId),
          };
        })
        .filter((item) => item.id) as PageStateData['blocks'];

      const storedValuesPanelSelector = CurrentStateStorage.getSelectorFromActivePanel(`[${storedValueTypeKey}]`);
      const storedValuesSelector = shouldLookIntoModal
        ? `${CurrentStateStorage.modalRootSelector} [${storedValueTypeKey}]`
        : storedValuesPanelSelector;

      /** Собираем существующие сохраненные данные на странице в панеле или модальном окне */
      const storedValues = document.querySelectorAll<HTMLElement>(storedValuesSelector);

      const values = Array.from(storedValues)
        .map((el) => ({
          value: el.getAttribute(storedValueValueKey),
          key: el.getAttribute(storedValueTypeKey),
        }))
        .reduce<Partial<PageStateData>>((acc, { value, key }) => {
          if (key) {
            const dataKey = key as keyof PageStateData;
            acc[dataKey] = CurrentStateStorage.mapStoredValues(dataKey, value || '') as any;
          }
          return acc;
        }, {});

      CurrentStateStorage.data = { ...CurrentStateStorage.data, ...values, blocks: blocksArray };
    });
  };
}

type SetupParams = {
  /** Селектор корневого элемента модальной страницы, откуда будут собираться данные */
  modalRootSelector: string;
  /** Селектор корневого элемента панели, откуда будут собираться данные */
  panelSelectors: string[];
  /** Ключи значений в хранилище, которые сохраняются даже после вызова методов CurrentStateStorage.cleanUp и CurrentStateStorage.setPage */
  storedKeys?: Array<keyof PageStateData>;
  /**/
  mapStoredValues?: <K extends keyof PageStateData>(dataKey: K, value: string) => PageStateData[K] | undefined;
};

/**
 * Настройка конфигурации работы хранилища CurrentStateStorage
 */
export const setUpAnalyticsStorage = ({
  modalRootSelector,
  panelSelectors,
  mapStoredValues,
  storedKeys,
}: SetupParams) => {
  CurrentStateStorage.modalRootSelector = modalRootSelector;
  CurrentStateStorage.panelSelectors = panelSelectors;
  CurrentStateStorage.mapStoredValues = mapStoredValues || defaultMapStoredKeys;
  CurrentStateStorage.storedKeys = storedKeys || [];
};
