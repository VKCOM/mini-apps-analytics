import { ID } from '../../types';
import { PageStateData, PlainDataKey } from '../types';
import { dataBlockIdKey, dataItemIdKey, storedValueTypeKey, storedValueValueKey } from '../../utils';

const defaultData: PageStateData = {
  blocks: [],
};

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
  static data: PageStateData = defaultData;

  static storedKeys: Array<keyof PageStateData> = [];

  static setPage = (screenName: string) => {
    const newData: PageStateData = {
      ...defaultData,
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

  static addPlainData = <K extends PlainDataKey>(field: K, value: PageStateData[K]) => {
    CurrentStateStorage.data[field] = value;
  };

  static registerBlock = (block: { id: ID; name?: string; entityType?: string; items?: ID[] }) => {
    if (CurrentStateStorage.data.blocks.findIndex(({ id }) => id === block.id) !== -1) {
      return;
    }

    CurrentStateStorage.data.blocks.push({ ...block, items: block.items || [] });
  };

  static addItemByBlockId = (blockId: ID, item: { id: ID; name: string }) => {
    const block = CurrentStateStorage.data.blocks.find(({ id }) => id === blockId);

    if (!block || block.items.includes(item.id)) {
      return;
    }

    block.items.push(item.id);
  };

  static getValue = <K extends Exclude<keyof PageStateData, 'blocks'>>(key: K) => {
    return CurrentStateStorage.data[key];
  };

  static cleanUp = () => {
    CurrentStateStorage.data.blocks.length = 0;
    const newData: PageStateData = {
      ...defaultData,
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

  static panelSelectors: string[] = [];

  static getSelectorFromActivePanel = (searchSelector: string) =>
    CurrentStateStorage.panelSelectors
      .reduce((acc, panelSelector) => `${acc}, ${panelSelector} ${searchSelector}`, '')
      /** Из-за склейки в редьюсе получается лишние ", " в самом начале. Избавляемся от некорректной части CSS селектора */
      .slice(2);

  static modalRootSelector = `.vkuiModalRoot`;

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
                : staticItems.map((item) => item.dataset.itemId),
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
  modalRootSelector: string;
  panelSelectors: string[];
  mapStoredValues?: <K extends keyof PageStateData>(dataKey: K, value: string) => PageStateData[K] | undefined;
  storedKeys?: Array<keyof PageStateData>;
};
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
