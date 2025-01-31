[@vkontakte/mini-apps-analytics](../README.md) / ScreenOpenEventService

# Class: ScreenOpenEventService

## Hierarchy

- `BaseEvent`

  ↳ **`ScreenOpenEventService`**

## Table of contents

### Constructors

- [constructor](ScreenOpenEventService.md#constructor)

### Properties

- [getPageData](ScreenOpenEventService.md#getpagedata)
- [params](ScreenOpenEventService.md#params)
- [sendEvent](ScreenOpenEventService.md#sendevent)

### Methods

- [registerScreenListener](ScreenOpenEventService.md#registerscreenlistener)
- [send](ScreenOpenEventService.md#send)

## Constructors

### constructor

• **new ScreenOpenEventService**(`getPageData`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `getPageData` | () => [`PageStateData`](../README.md#pagestatedata) |

#### Overrides

BaseEvent.constructor

#### Defined in

[events/screenOpen/screenOpen.event.ts:7](https://github.com/VKCOM/mini-apps-analytics/blob/d86ab24/packages/core/src/events/screenOpen/screenOpen.event.ts#L7)

## Properties

### getPageData

• `Private` `Readonly` **getPageData**: () => [`PageStateData`](../README.md#pagestatedata)

#### Type declaration

▸ (): [`PageStateData`](../README.md#pagestatedata)

##### Returns

[`PageStateData`](../README.md#pagestatedata)

#### Defined in

[events/screenOpen/screenOpen.event.ts:6](https://github.com/VKCOM/mini-apps-analytics/blob/d86ab24/packages/core/src/events/screenOpen/screenOpen.event.ts#L6)

___

### params

• `Protected` `Readonly` **params**: `Params`

#### Inherited from

BaseEvent.params

#### Defined in

[events/base/base.event.ts:23](https://github.com/VKCOM/mini-apps-analytics/blob/d86ab24/packages/core/src/events/base/base.event.ts#L23)

___

### sendEvent

▪ `Static` **sendEvent**: `SendEvent`

#### Inherited from

BaseEvent.sendEvent

#### Defined in

[events/base/base.event.ts:18](https://github.com/VKCOM/mini-apps-analytics/blob/d86ab24/packages/core/src/events/base/base.event.ts#L18)

## Methods

### registerScreenListener

▸ **registerScreenListener**(): `number`

Регистрирует интервал для проверки наличия на странице элементов с data-аттрибутом dataBlockLoading="true".
В случае, если таких элементов на странице не существует вызывает метод отправки события
this.send({ ...this.getPageData(), clientTime: time });

#### Returns

`number`

#### Defined in

[events/screenOpen/screenOpen.event.ts:18](https://github.com/VKCOM/mini-apps-analytics/blob/d86ab24/packages/core/src/events/screenOpen/screenOpen.event.ts#L18)

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

[events/base/base.event.ts:33](https://github.com/VKCOM/mini-apps-analytics/blob/d86ab24/packages/core/src/events/base/base.event.ts#L33)
