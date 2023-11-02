@vkontakte/mini-apps-analytics

# @vkontakte/mini-apps-analytics

## Table of contents

### Classes

- [ClickEventService](classes/ClickEventService.md)
- [CurrentStateStorage](classes/CurrentStateStorage.md)
- [ScreenOpenEventService](classes/ScreenOpenEventService.md)
- [ShowEventService](classes/ShowEventService.md)

### Interfaces

- [CustomData](interfaces/CustomData.md)

### Type Aliases

- [AnalyticsEvent](README.md#analyticsevent)
- [CommonEventData](README.md#commoneventdata)
- [HTMLBlockData](README.md#htmlblockdata)
- [HTMLItemInfo](README.md#htmliteminfo)
- [ID](README.md#id)
- [ItemDataAttributes](README.md#itemdataattributes)
- [PageData](README.md#pagedata)
- [PageStateData](README.md#pagestatedata)
- [PlainDataKey](README.md#plaindatakey)
- [TappableItemDataAttributes](README.md#tappableitemdataattributes)

### Variables

- [dataBlockIdKey](README.md#datablockidkey)
- [dataBlockIsLeaf](README.md#datablockisleaf)
- [dataBlockLoading](README.md#datablockloading)
- [dataBlockNameKey](README.md#datablocknamekey)
- [dataEntityTypeKey](README.md#dataentitytypekey)
- [dataEventTypeKey](README.md#dataeventtypekey)
- [dataItemIdKey](README.md#dataitemidkey)
- [dataItemNameKey](README.md#dataitemnamekey)
- [dataTapEventValue](README.md#datatapeventvalue)
- [storedValueTypeKey](README.md#storedvaluetypekey)
- [storedValueValueKey](README.md#storedvaluevaluekey)

### Functions

- [getBlockInfo](README.md#getblockinfo)
- [getBlockParameters](README.md#getblockparameters)
- [getItemInfo](README.md#getiteminfo)
- [getItemParameters](README.md#getitemparameters)
- [getStoredValueAttributes](README.md#getstoredvalueattributes)
- [getTappableItemParameters](README.md#gettappableitemparameters)
- [lookForContainerBlockElement](README.md#lookforcontainerblockelement)
- [setUpAnalyticsStorage](README.md#setupanalyticsstorage)
- [setupOnEventSend](README.md#setuponeventsend)

## Type Aliases

### AnalyticsEvent

Ƭ **AnalyticsEvent**: [`CommonEventData`](README.md#commoneventdata) & `Partial`<[`PageData`](README.md#pagedata)\> & [`CustomData`](interfaces/CustomData.md)

Вся собираемая аналитическая информация о странице

#### Defined in

[types/analyticsEvent.ts:6](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/types/analyticsEvent.ts#L6)

___

### CommonEventData

Ƭ **CommonEventData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientTime` | `Date` | client_time - Время события на клиенте |
| `event` | ``"screen_open"`` \| ``"tap"`` \| ``"show"`` | - |
| `type` | ``"type_action"`` \| ``"type_navgo"`` \| ``"type_view"`` \| ``"type_click"`` | - |

#### Defined in

[types/eventData.ts:1](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/types/eventData.ts#L1)

___

### HTMLBlockData

Ƭ **HTMLBlockData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionBlockId` | `string` | ID блока, заданый через data-атрибут data-block-id |
| `actionBlockIndex` | `number` | Порядковый номер блока в массиве blocks |
| `actionBlockName` | `string` | Имя блока блока, заданое через data-атрибут data-block-name |
| `actionEntityType` | `string` | Тип сущностей внутри блока, заданый через data-атрибут data-entity-type |
| `isBlockLeaf` | `boolean` | Является ли блок листовым элементом. Определяется на основе data-атрибута data-block-is-leaf |

#### Defined in

[utils/blockElement.ts:16](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/blockElement.ts#L16)

___

### HTMLItemInfo

Ƭ **HTMLItemInfo**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionElementId` | [`ID`](README.md#id) | ID элемента, заданый через data-атрибут data-item-id |
| `actionElementIndex` | `number` | Порядковый номер элемента в блоке, внутри которого он находится. -1, если элемент не найден в блоке |
| `actionElementName?` | `string` | Имя блока элемента, заданое через data-атрибут data-item-name |

#### Defined in

[utils/getItemInfo.ts:4](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/getItemInfo.ts#L4)

___

### ID

Ƭ **ID**: `string` \| `number`

#### Defined in

[types/pageState.ts:1](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/types/pageState.ts#L1)

___

### ItemDataAttributes

Ƭ **ItemDataAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data-item-id` | [`ID`](README.md#id) |
| `data-item-name?` | `string` |

#### Defined in

[utils/dataAttributes.ts:33](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L33)

___

### PageData

Ƭ **PageData**: `Object`

Общая для всех миниприложений информация, необходимая для сбора аналитики

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionBlockId?` | `string` | - |
| `actionBlockIndex?` | `number` | - |
| `actionBlockName?` | `string` | - |
| `actionElementId?` | [`ID`](README.md#id) | - |
| `actionElementIndex?` | `number` | - |
| `actionElementName?` | `string` | - |
| `actionEntityType?` | `string` | - |
| `blocks` | { `entityType?`: `string` ; `id`: [`ID`](README.md#id) ; `items`: [`ID`](README.md#id)[]  }[] | Составное состояние страницы для более удобной локальной обработки данных. По отдельным полям смотреть информацию в документации в confluence |
| `launchUrl?` | `string` | Начальный URL при старте приложения |
| `screenName?` | `string` | screen_name - Где произошло событие, на каком экране приложения. Для экранов категорий составной экран coupons_catalog или coupons_my_coupons |
| `source?` | `string` | С какой страницы перешли (всегда внутренний роутинг или vk_ref) |

#### Defined in

[types/pageState.ts:4](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/types/pageState.ts#L4)

___

### PageStateData

Ƭ **PageStateData**: [`PageData`](README.md#pagedata) & `Partial`<[`CustomData`](interfaces/CustomData.md)\>

Аналитическая информация на странице

#### Defined in

[storage/types.ts:4](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/storage/types.ts#L4)

___

### PlainDataKey

Ƭ **PlainDataKey**: `Exclude`<keyof [`PageStateData`](README.md#pagestatedata), ``"blocks"`` \| ``"screenName"``\>

#### Defined in

[storage/types.ts:6](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/storage/types.ts#L6)

___

### TappableItemDataAttributes

Ƭ **TappableItemDataAttributes**: [`ItemDataAttributes`](README.md#itemdataattributes) & { `data-event-type`: ``"tap"`` ; `data-json?`: `string`  }

#### Defined in

[utils/dataAttributes.ts:49](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L49)

## Variables

### dataBlockIdKey

• `Const` **dataBlockIdKey**: ``"data-block-id"``

#### Defined in

[utils/dataAttributes.ts:3](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L3)

___

### dataBlockIsLeaf

• `Const` **dataBlockIsLeaf**: ``"data-block-is-leaf"``

Data-атрибут для обозначения того, что блок является листовым.

Листовой блок - блок, являющийся единственным на странице и содержащий информацию только об одном элементе.

**`Example`**

```ts
Модалка/страница конкретного товара/акции - базовый пример листового блока: вся страница является представлением
единсвтенной сущности
```

#### Defined in

[utils/dataAttributes.ts:14](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L14)

___

### dataBlockLoading

• `Const` **dataBlockLoading**: ``"data-block-is-loading-content"``

#### Defined in

[utils/dataAttributes.ts:16](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L16)

___

### dataBlockNameKey

• `Const` **dataBlockNameKey**: ``"data-block-name"``

#### Defined in

[utils/dataAttributes.ts:4](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L4)

___

### dataEntityTypeKey

• `Const` **dataEntityTypeKey**: ``"data-entity-type"``

#### Defined in

[utils/dataAttributes.ts:17](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L17)

___

### dataEventTypeKey

• `Const` **dataEventTypeKey**: ``"data-event-type"``

#### Defined in

[utils/dataAttributes.ts:30](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L30)

___

### dataItemIdKey

• `Const` **dataItemIdKey**: ``"data-item-id"``

#### Defined in

[utils/dataAttributes.ts:28](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L28)

___

### dataItemNameKey

• `Const` **dataItemNameKey**: ``"data-item-name"``

#### Defined in

[utils/dataAttributes.ts:29](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L29)

___

### dataTapEventValue

• `Const` **dataTapEventValue**: ``"tap"``

#### Defined in

[utils/dataAttributes.ts:31](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L31)

___

### storedValueTypeKey

• `Const` **storedValueTypeKey**: ``"data-stored-type"``

#### Defined in

[utils/dataAttributes.ts:75](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L75)

___

### storedValueValueKey

• `Const` **storedValueValueKey**: ``"data-stored-value"``

#### Defined in

[utils/dataAttributes.ts:76](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L76)

## Functions

### getBlockInfo

▸ **getBlockInfo**<`T`, `B`\>(`block`, `blocks`): [`HTMLBlockData`](README.md#htmlblockdata)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` |
| `B` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `T` |
| `blocks` | `B`[] |

#### Returns

[`HTMLBlockData`](README.md#htmlblockdata)

#### Defined in

[utils/blockElement.ts:29](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/blockElement.ts#L29)

___

### getBlockParameters

▸ **getBlockParameters**(`«destructured»`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `BlockParams` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data-block-id` | `string` \| `number` |
| `data-block-is-leaf` | `string` |
| `data-block-name` | `string` |
| `data-entity-type` | `string` |
| `data-type` | `string` |

#### Defined in

[utils/dataAttributes.ts:20](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L20)

___

### getItemInfo

▸ **getItemInfo**<`B`, `T`\>(`block`, `targetItem`): [`HTMLItemInfo`](README.md#htmliteminfo) & `Partial`<[`CustomData`](interfaces/CustomData.md)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `HTMLElement` |
| `T` | extends `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | ``null`` \| `B` |
| `targetItem` | `T` |

#### Returns

[`HTMLItemInfo`](README.md#htmliteminfo) & `Partial`<[`CustomData`](interfaces/CustomData.md)\>

#### Defined in

[utils/getItemInfo.ts:13](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/getItemInfo.ts#L13)

___

### getItemParameters

▸ **getItemParameters**(`id`, `name?`): [`ItemDataAttributes`](README.md#itemdataattributes)

Функция-хелпер для создания набора data-атрибутов для элемента

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](README.md#id) |
| `name?` | `string` |

#### Returns

[`ItemDataAttributes`](README.md#itemdataattributes)

#### Defined in

[utils/dataAttributes.ts:39](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L39)

___

### getStoredValueAttributes

▸ **getStoredValueAttributes**(`type`, `value?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `value?` | `string` \| `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data-stored-type` | `string` |
| `data-stored-value` | `undefined` \| `string` \| `number` |

#### Defined in

[utils/dataAttributes.ts:78](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L78)

___

### getTappableItemParameters

▸ **getTappableItemParameters**(`id`, `name?`, `data?`): [`TappableItemDataAttributes`](README.md#tappableitemdataattributes)

Функция-хелпер для создания набора data-атрибутов для элемента, по которому собирается аналитика
по tap событию

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](README.md#id) |
| `name?` | `string` |
| `data?` | `Partial`<[`CustomData`](interfaces/CustomData.md)\> |

#### Returns

[`TappableItemDataAttributes`](README.md#tappableitemdataattributes)

#### Defined in

[utils/dataAttributes.ts:59](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/dataAttributes.ts#L59)

___

### lookForContainerBlockElement

▸ **lookForContainerBlockElement**(`itemElement`): ``null`` \| `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemElement` | `HTMLElement` |

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[utils/blockElement.ts:3](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/utils/blockElement.ts#L3)

___

### setUpAnalyticsStorage

▸ **setUpAnalyticsStorage**(`«destructured»`): `void`

Настройка конфигурации работы хранилища CurrentStateStorage

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `SetupParams` |

#### Returns

`void`

#### Defined in

[storage/current/currentState.storage.ts:202](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/storage/current/currentState.storage.ts#L202)

___

### setupOnEventSend

▸ **setupOnEventSend**(`sendEvent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sendEvent` | `SendEvent` |

#### Returns

`void`

**`Description`**

Настройка функции срабатывания на событие

#### Defined in

[events/base/base.event.ts:42](https://github.com/VKCOM/mini-apps-analytics/blob/298fc17/packages/core/src/events/base/base.event.ts#L42)
