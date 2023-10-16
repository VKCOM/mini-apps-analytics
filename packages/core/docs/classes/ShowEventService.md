[@vkontakte/mini-apps-analytics](../README.md) / ShowEventService

# Class: ShowEventService

## Hierarchy

- `BaseEvent`

  ↳ **`ShowEventService`**

## Table of contents

### Constructors

- [constructor](ShowEventService.md#constructor)

### Properties

- [disabled](ShowEventService.md#disabled)
- [getPageData](ShowEventService.md#getpagedata)
- [params](ShowEventService.md#params)
- [sendEvent](ShowEventService.md#sendevent)

### Methods

- [disable](ShowEventService.md#disable)
- [enable](ShowEventService.md#enable)
- [register](ShowEventService.md#register)
- [send](ShowEventService.md#send)

## Constructors

### constructor

• **new ShowEventService**(`getPageData`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `getPageData` | () => [`PageStateData`](../README.md#pagestatedata) |

#### Overrides

BaseEvent.constructor

#### Defined in

events/show/show.event.ts:29

## Properties

### disabled

• `Private` **disabled**: `boolean` = `false`

#### Defined in

events/show/show.event.ts:19

___

### getPageData

• `Private` `Readonly` **getPageData**: () => [`PageStateData`](../README.md#pagestatedata)

#### Type declaration

▸ (): [`PageStateData`](../README.md#pagestatedata)

##### Returns

[`PageStateData`](../README.md#pagestatedata)

#### Defined in

events/show/show.event.ts:18

___

### params

• `Protected` `Readonly` **params**: `Params`

#### Inherited from

BaseEvent.params

#### Defined in

events/base/base.event.ts:22

___

### sendEvent

▪ `Static` **sendEvent**: `SendEvent`

#### Inherited from

BaseEvent.sendEvent

#### Defined in

events/base/base.event.ts:17

## Methods

### disable

▸ **disable**(): `void`

#### Returns

`void`

#### Defined in

events/show/show.event.ts:21

___

### enable

▸ **enable**(): `void`

#### Returns

`void`

#### Defined in

events/show/show.event.ts:25

___

### register

▸ **register**<`T`\>(`elementRef`, `inputOptions?`): () => `void`

Регистрирует IntersectionObserver на элементе, с заданными параметрами (по дефолту - {threshold: 0.7})
Возвращает функцию отключения наблюдения IntersectionObserver на элементе.
При показе элемента собирает информацию об элеменет (getItemInfo), блоке (getBlockInfo) и странице (this.getPageData),
вызывает

this.send({
    ...getItemInfo(...),
    ...this.getPageData(),
    ...getBlockInfo(...),
})

и отписывается от IntersectionObserver.

Документация по inputOptions https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `elementRef` | `T` | `undefined` |
| `inputOptions` | `Options` | `DEFAULT_OPTIONS` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

events/show/show.event.ts:49

___

### send

▸ **send**(`data`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Omit`<`EventData`, ``"event"`` \| ``"type"``\> |

#### Returns

`void` \| `Promise`<`void`\>

**`Description`**

метод отправки события, вызываемый для всех дочерних классов

#### Inherited from

BaseEvent.send

#### Defined in

events/base/base.event.ts:31
