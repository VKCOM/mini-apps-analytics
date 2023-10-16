import { dataBlockIdKey, dataBlockIsLeaf, dataBlockNameKey, dataEntityTypeKey } from './dataAttributes';

export const lookForContainerBlockElement = (itemElement: HTMLElement): HTMLElement | null => {
  const parent = itemElement.parentElement;
  if (!parent) {
    return null;
  }

  if (parent.getAttribute(dataBlockIdKey)) {
    return parent;
  }

  return lookForContainerBlockElement(parent);
};

export type HTMLBlockData = {
  /** ID блока, заданый через data-атрибут data-block-id */
  actionBlockId: string;
  /** Тип сущностей внутри блока, заданый через data-атрибут data-entity-type */
  actionEntityType: string;
  /** Имя блока блока, заданое через data-атрибут data-block-name */
  actionBlockName: string;
  /** Порядковый номер блока в массиве blocks */
  actionBlockIndex: number;
  /** Является ли блок листовым элементом. Определяется на основе data-атрибута data-block-is-leaf */
  isBlockLeaf: boolean;
};

export const getBlockInfo = <T extends HTMLElement, B extends { id: string | number }>(
  block: T,
  blocks: B[]
): HTMLBlockData => {
  const actionBlockId = block.getAttribute(dataBlockIdKey) || '';
  const actionEntityType = block.getAttribute(dataEntityTypeKey) || '';
  const actionBlockName = block.getAttribute(dataBlockNameKey) || '';
  const isBlockLeaf = block.getAttribute(dataBlockIsLeaf) === 'true';
  const actionBlockIndex = blocks.findIndex((blockItem) => blockItem.id === actionBlockId);

  return {
    actionBlockId,
    actionEntityType,
    actionBlockName,
    actionBlockIndex,
    isBlockLeaf,
  };
};
