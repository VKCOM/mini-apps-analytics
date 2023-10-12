import { dataBlockIdKey, dataBlockIsLeaf, dataBlockNameKey, dataEntityTypeKey } from './dataAttributes';

export const lookForContainerBlockElement = (itemElement: HTMLElement): HTMLElement | null => {
  const parent = itemElement.parentElement;
  if (!parent) {
    return null;
  }

  if (!!parent.getAttribute(dataBlockIdKey)) {
    return parent;
  }

  return lookForContainerBlockElement(parent);
};

export const getBlockInfo = <T extends HTMLElement, B extends { id: string | number }>(block: T, blocks: B[]) => {
  const actionBlockId = block.getAttribute(dataBlockIdKey) || '';
  const actionEntityType = block.getAttribute(dataEntityTypeKey) || '';
  const actionBlockName = block.getAttribute(dataBlockNameKey) || '';
  const isBlockLeaf = block.getAttribute(dataBlockIsLeaf) === 'true';
  const actionBlockIndex = blocks.findIndex((block) => block.id === actionBlockId);

  return {
    actionBlockId,
    actionEntityType,
    actionBlockName,
    actionBlockIndex,
    isBlockLeaf,
  };
};
