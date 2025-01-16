[@vkontakte/mini-apps-analytics](../README.md) / ClickEventService

# Class: ClickEventService

Класс-обработчик события tap(click) на странице

## Hierarchy

- `BaseEvent`

  ↳ **`ClickEventService`**

## Table of contents

### Constructors

- [constructor](ClickEventService.md#constructor)

### Properties

- [captureListener](ClickEventService.md#capturelistener)
- [getPageData](ClickEventService.md#getpagedata)
- [noCaptureListener](ClickEventService.md#nocapturelistener)
- [params](ClickEventService.md#params)
- [sendEvent](ClickEventService.md#sendevent)

### Methods

- [onDestroy](ClickEventService.md#ondestroy)
- [send](ClickEventService.md#send)

## Constructors

### constructor

• **new ClickEventService**(`getPageData`)

При создании экземпляра класса добавляет this.listener на событие 'click' на document

#### Parameters

| Name | Type |
| :------ | :------ |
| `getPageData` | () => [`PageStateData`](../README.md#pagestatedata) |

#### Overrides

BaseEvent.constructor

#### Defined in

[events/clickEvent/click.event.ts:46](https://github.com/VKCOM/mini-apps-analytics/blob/533127a/packages/core/src/events/clickEvent/click.event.ts#L46)

## Properties

### captureListener

• `Private` `Readonly` **captureListener**: (`e`: `MouseEvent`) => `void`

#### Type declaration

▸ (`e`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

##### Returns

`void`

#### Defined in

[events/clickEvent/click.event.ts:32](https://github.com/VKCOM/mini-apps-analytics/blob/533127a/packages/core/src/events/clickEvent/click.event.ts#L32)

___

### getPageData

• **getPageData**: () => [`PageStateData`](../README.md#pagestatedata)

#### Type declaration

▸ (): [`PageStateData`](../README.md#pagestatedata)

##### Returns

[`PageStateData`](../README.md#pagestatedata)

#### Defined in

[events/clickEvent/click.event.ts:34](https://github.com/VKCOM/mini-apps-analytics/blob/533127a/packages/core/src/events/clickEvent/click.event.ts#L34)

___

### noCaptureListener

• `Private` `Readonly` **noCaptureListener**: (`e`: `MouseEvent`) => `void`

#### Type declaration

▸ (`e`): `void`

Зарегистрированный при инициализации экземпляра event listener на всем document.
При событии click на странице проверяет, был ли установлен у targetElement data-атрибут
data-event-type="tap". Если был, проверяет, находится ли элемент внутри блока: есть ли у какого-либо родительского
элемента значение data-block-id. Если условия соблюдены, собирает информацию об элементы с помощью функций
getBlockInfo, getItemInfo и
this.send({
    ...this.getPageData(),
    ...getBlockInfo(...),
    ...getItemInfo(...),
})
NOTE: Заводим 2 отдельных листенера для отлова события на разных фазах (погружение/всплытие)

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

##### Returns

`void`

#### Defined in

[events/clickEvent/click.event.ts:31](https://github.com/VKCOM/mini-apps-analytics/blob/533127a/packages/core/src/events/clickEvent/click.event.ts#L31)

___

### params

• `Protected` `Readonly` **params**: `Params`

#### Inherited from

BaseEvent.params

#### Defined in

[events/base/base.event.ts:23](https://github.com/VKCOM/mini-apps-analytics/blob/533127a/packages/core/src/events/base/base.event.ts#L23)

___

### sendEvent

▪ `Static` **sendEvent**: `SendEvent`

#### Inherited from

BaseEvent.sendEvent

#### Defined in

[events/base/base.event.ts:18](https://github.com/VKCOM/mini-apps-analytics/blob/533127a/packages/core/src/events/base/base.event.ts#L18)

## Methods

### onDestroy

▸ **onDestroy**(): `void`

Удаляет this.noCaptureListener/this.captureListener из списка листенеро на document'е

#### Returns

`void`

#### Defined in

[events/clickEvent/click.event.ts:37](https://github.com/VKCOM/mini-apps-analytics/blob/533127a/packages/core/src/events/clickEvent/click.event.ts#L37)

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

[events/base/base.event.ts:33](https://github.com/VKCOM/mini-apps-analytics/blob/533127a/packages/core/src/events/base/base.event.ts#L33)
