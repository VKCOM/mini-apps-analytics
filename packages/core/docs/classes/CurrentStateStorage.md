[@vkontakte/mini-apps-analytics](../README.md) / CurrentStateStorage

# Class: CurrentStateStorage

## Table of contents

### Constructors

- [constructor](CurrentStateStorage.md#constructor)

### Properties

- [data](CurrentStateStorage.md#data)
- [mapStoredValues](CurrentStateStorage.md#mapstoredvalues)
- [modalRootSelector](CurrentStateStorage.md#modalrootselector)
- [panelSelectors](CurrentStateStorage.md#panelselectors)
- [storedKeys](CurrentStateStorage.md#storedkeys)

### Methods

- [addItemByBlockId](CurrentStateStorage.md#additembyblockid)
- [addPlainData](CurrentStateStorage.md#addplaindata)
- [cleanUp](CurrentStateStorage.md#cleanup)
- [getSelectorFromActivePanel](CurrentStateStorage.md#getselectorfromactivepanel)
- [getValue](CurrentStateStorage.md#getvalue)
- [registerBlock](CurrentStateStorage.md#registerblock)
- [registerExistingValues](CurrentStateStorage.md#registerexistingvalues)
- [setPage](CurrentStateStorage.md#setpage)

## Constructors

### constructor

• **new CurrentStateStorage**()

## Properties

### data

▪ `Static` **data**: [`PageStateData`](../README.md#pagestatedata) = `defaultData`

#### Defined in

[storage/current/currentState.storage.ts:23](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L23)

___

### mapStoredValues

▪ `Static` **mapStoredValues**: <K\>(`dataKey`: `K`, `value`: `string`) => `undefined` \| [`PageStateData`](../README.md#pagestatedata)[`K`] = `defaultMapStoredKeys`

#### Type declaration

▸ <`K`\>(`dataKey`, `value`): `undefined` \| [`PageStateData`](../README.md#pagestatedata)[`K`]

##### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`PageData`](../README.md#pagedata) |

##### Parameters

| Name | Type |
| :------ | :------ |
| `dataKey` | `K` |
| `value` | `string` |

##### Returns

`undefined` \| [`PageStateData`](../README.md#pagestatedata)[`K`]

#### Defined in

[storage/current/currentState.storage.ts:119](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L119)

___

### modalRootSelector

▪ `Static` **modalRootSelector**: `string`

Селектор корневого элемента модальной страницы, откуда будут собираться данные

#### Defined in

[storage/current/currentState.storage.ts:131](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L131)

___

### panelSelectors

▪ `Static` **panelSelectors**: `string`[] = `[]`

Селектор корневого элемента панели, откуда будут собираться данные

#### Defined in

[storage/current/currentState.storage.ts:122](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L122)

___

### storedKeys

▪ `Static` **storedKeys**: keyof [`PageData`](../README.md#pagedata)[] = `[]`

Ключи значений в хранилище, которые сохраняются даже после вызова методов CurrentStateStorage.cleanUp и CurrentStateStorage.setPage

#### Defined in

[storage/current/currentState.storage.ts:26](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L26)

## Methods

### addItemByBlockId

▸ `Static` **addItemByBlockId**(`blockId`, `item`): `void`

Добавляет информацию в CurrentStateStorage.data.block[blockId] об элементе.
Если в блоке уже существует такой элемент, дважды элемент добавлен не будет

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | [`ID`](../README.md#id) |
| `item` | `Object` |
| `item.id` | [`ID`](../README.md#id) |
| `item.name?` | `string` |

#### Returns

`void`

#### Defined in

[storage/current/currentState.storage.ts:76](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L76)

___

### addPlainData

▸ `Static` **addPlainData**<`K`\>(`field`, `value`): `void`

Устанавливает значение по заданному ключу(field) в CurrentStateStorage.data[field]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`PlainDataKey`](../README.md#plaindatakey) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `K` |
| `value` | [`PageStateData`](../README.md#pagestatedata)[`K`] |

#### Returns

`void`

#### Defined in

[storage/current/currentState.storage.ts:56](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L56)

___

### cleanUp

▸ `Static` **cleanUp**(): `void`

Метод для сброса текущих значений в CurrentStateStorage.data.
 При вызове:

 - обнуляет хранимое значение CurrentStateStorage.data, при этом
 - сохраняет значение launchUrl
 - сохраняет ранее записанные данные для значений, указанных в CurrentStateStorage.storeKeys

#### Returns

`void`

#### Defined in

[storage/current/currentState.storage.ts:100](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L100)

___

### getSelectorFromActivePanel

▸ `Static` **getSelectorFromActivePanel**(`searchSelector`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchSelector` | `string` |

#### Returns

`string`

#### Defined in

[storage/current/currentState.storage.ts:124](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L124)

___

### getValue

▸ `Static` **getValue**<`K`\>(`key`): [`PageStateData`](../README.md#pagestatedata)[`K`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"source"`` \| ``"launchUrl"`` \| ``"screenName"`` \| ``"actionBlockIndex"`` \| ``"actionBlockName"`` \| ``"actionBlockId"`` \| ``"actionElementIndex"`` \| ``"actionElementName"`` \| ``"actionElementId"`` \| ``"actionEntityType"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

[`PageStateData`](../README.md#pagestatedata)[`K`]

Текущее значение в хранилище данных CurrentStateStorage.data[key]

#### Defined in

[storage/current/currentState.storage.ts:87](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L87)

___

### registerBlock

▸ `Static` **registerBlock**(`block`): `void`

Добавляет информацию о переданном блоке в CurrentStateStorage.data.block.
 Если блок с таким id уже зарегистрирован, дважды блок добавлен не будет

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `Object` |
| `block.entityType?` | `string` |
| `block.id` | [`ID`](../README.md#id) |
| `block.items?` | [`ID`](../README.md#id)[] |
| `block.name?` | `string` |

#### Returns

`void`

#### Defined in

[storage/current/currentState.storage.ts:64](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L64)

___

### registerExistingValues

▸ `Static` **registerExistingValues**(`shouldLookIntoModal?`): `void`

Собирает существующую информацию на странице на основе data-атрибутов (см. документацию по поддерживаемым data-атрибутам )

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shouldLookIntoModal?` | `boolean` | собирать ли инфомарцию по странице в панели или в модальной странице |

#### Returns

`void`

#### Defined in

[storage/current/currentState.storage.ts:139](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L139)

___

### setPage

▸ `Static` **setPage**(`screenName`): `void`

Метод для установки значения screenName.
 При вызове:

 - устанавливает переданный screenName
 - обнуляет хранимое значение CurrentStateStorage.data, при этом
 - сохраняет значение launchUrl
 - сохраняет ранее записанные данные для значений, указанных в CurrentStateStorage.storeKeys

#### Parameters

| Name | Type |
| :------ | :------ |
| `screenName` | `string` |

#### Returns

`void`

#### Defined in

[storage/current/currentState.storage.ts:38](https://github.com/VKCOM/mini-apps-analytics/blob/5e453d9/packages/core/src/storage/current/currentState.storage.ts#L38)
