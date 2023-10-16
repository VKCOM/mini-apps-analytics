@vkontakte/mini-apps-analytics-react

# @vkontakte/mini-apps-analytics-react

## Table of contents

### Type Aliases

- [AnalyticsContextValue](README.md#analyticscontextvalue)
- [UsePageAnalyticsParams](README.md#usepageanalyticsparams)

### Variables

- [analyticsContext](README.md#analyticscontext)

### Functions

- [AnalyticsContextProvider](README.md#analyticscontextprovider)
- [useAddPlainData](README.md#useaddplaindata)
- [useBlockRef](README.md#useblockref)
- [useElementShowRef](README.md#useelementshowref)
- [useItemRef](README.md#useitemref)
- [usePageAnalytics](README.md#usepageanalytics)

## Type Aliases

### AnalyticsContextValue

Ƭ **AnalyticsContextValue**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `isShowElementEventActive` | `boolean` | Флаг для отключения срабатывания show события внутри useElementShowRef. Необходим, например, при открытии/закрытии модальных страниц - это событие считается полноценной сменой страницы и события show должны отрабатывать заново, при закрытии модальной страницы, притом, что открытие модальной страницы не влечет отпарвку события show |
| `screenOpenEventService` | `ScreenOpenEventService` | Инстанс класса ShowEventService. При передаче инстанса есть возможность сконфигурировать отправку screen_open события разными способами, настроив разные контексты react'a |
| `showEventService` | `ShowEventService` | Инстанс класса ShowEventService. При передаче инстанса есть возможность сконфигурировать отправку show события разными способами, настроив разные контексты react'a |

#### Defined in

packages/react/src/context/analytics.context.tsx:8

___

### UsePageAnalyticsParams

Ƭ **UsePageAnalyticsParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cleanUpDeps?` | `string`[] | Значения, при которых необходимо очистить CurrentStateStorage.data Пример использования. Динамическое изменение фильтров на странице должно инициировать новую регистрацию существующих элементов на странице, но не должно инициировать смену страницы |
| `modalPageName` | `string` \| ``null`` \| ``0`` | Имя текущей модальной страницы. При изменении - вызывается событие screen_open; - сбрасыватеся CurrentStateStorage.data; - устанавливается соответствующее значение CurrentStateStorage.data.screenName; 0 - системное значение, говорящее о том, что не надо учитывать эту модалку в потоке изменения экранов |
| `pageDeps?` | `string`[] | Значения, при которых панель/модальная страница остаются неизменными (меняется только контент). Пример использования. Страница с различными табами навигации: панель остается неизменной, но рендерится новая страница |
| `panelPageName` | `string` | Имя текущей панели. При изменении - вызывается событие screen_open; - сбрасыватеся CurrentStateStorage.data; - устанавливается соответствующее значение CurrentStateStorage.data.screenName; |

#### Defined in

packages/react/src/usePageAnalytics/usePageAnalytics.ts:9

## Variables

### analyticsContext

• `Const` **analyticsContext**: `Context`<[`AnalyticsContextValue`](README.md#analyticscontextvalue)\>

#### Defined in

packages/react/src/context/analytics.context.tsx:29

## Functions

### AnalyticsContextProvider

▸ **AnalyticsContextProvider**(`props`): `ReactNode`

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ProviderProps`<[`AnalyticsContextValue`](README.md#analyticscontextvalue)\> |

#### Returns

`ReactNode`

#### Defined in

node_modules/@types/react/index.d.ts:427

___

### useAddPlainData

▸ **useAddPlainData**<`K`\>(`key`, `value?`, `keepValue?`): `void`

Устанавливает значение по заданному ключу(field) в CurrentStateStorage.data[field].
При анмаунте удаляет значение из CurrentStateStorage.data[field]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `PlainDataKey` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `K` | `undefined` |
| `value?` | `PageStateData`[`K`] | `undefined` |
| `keepValue` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

packages/react/src/useAddPlainData/useAddPlainData.tsx:6

___

### useBlockRef

▸ **useBlockRef**<`T`\>(): `RefObject`<`T`\>

Необходим при рендере динамически подгружаемых блоков на странице.
В случае, если блоки статичны, простой вызов метода CurrentStateStorage.registerExistingValues
зарегистрирует существующие на странице значения.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` |

#### Returns

`RefObject`<`T`\>

React.ref для регистрации блока.

**`Example`**

```ts
import { getBlockParameters, getItemParameters } from '@vkontakte/mini-apps-analytics';
import { useBlockRef } from '@vkontakte/mini-apps-analytics-react'

const BlockElement = () => {
 const blockRef = useBlockRef<HTMLDivElement>()
 return (
     <div ref={blockRef} {...getBlockParameters({ id: 'blockId', entityType: 'customItemEntity', name: 'custom block name' })}>
       <div {...getItemParameters('customItemId')}>custom item content</div>
      </div>
  )
}

// Установит в CurrentStateStorage.data: {
//  ...,
//  blocks: [..., {
//    id: 'blockId',
//    name: 'custom block name',
//    entityType: 'customItemEntity',
//    items: ['customItemId']
//  }]
//  }
```

#### Defined in

packages/react/src/useBlockRef/useBlockRef.ts:34

___

### useElementShowRef

▸ **useElementShowRef**<`T`\>(): (`el`: `T`) => `void`

Регистрирует IntersectionObserver на элементе с помощью вызова ShowEventService.register.
При анмаунте элемента отписывается от IntersectionObserver.

Зависит от значения analyticsContext.showEventService:

- analyticsContext.showEventService === false - отписывается от IntersectionObserver
- analyticsContext.showEventService === true - пощдписывается от IntersectionObserver

Зависимость необходима, например, при открытии/закрытии модальных страниц - это событие считается полноценной
сменой страницы и события show должны отрабатывать заново, при закрытии модальной страницы

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` |

#### Returns

`fn`

▸ (`el`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `T` |

##### Returns

`void`

#### Defined in

packages/react/src/useElementShowRef/useElementShowRef.ts:17

___

### useItemRef

▸ **useItemRef**<`T`\>(`id`): `MutableRefObject`<``null`` \| `T`\>

Необходим при рендере динамически подгружаемых элементов на странице.
В случае, если контент статичен, простой вызов метода CurrentStateStorage.registerExistingValues
зарегистрирует существующие на странице значения.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | Для упрощения работы рантайма, необходимо передать id блока, внутри которого находится элемент |

#### Returns

`MutableRefObject`<``null`` \| `T`\>

React.ref для регистрации элемента внутри блока.

**`Example`**

```ts
import { useState } from 'react';
import { getBlockParameters, getItemParameters } from '@vkontakte/mini-apps-analytics';
import { useBlockRef, useItemRef } from '@vkontakte/mini-apps-analytics-react'

const Item: React.FC<{blockId: string}> = (props) => {
 const itemRef = useItemRef<HTMLBlockElement>(props.)blockId;
 return <div ref={itemRef} {...getItemParameters('customItemId')}>custom item content</div>
}

const BlockElement = () => {
const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
   setTimeout(() => {setIsLoading(false)}, 1000)
 }, [])

  return (
    <div {...getBlockParameters({ id: 'blockId', entityType: 'customItemEntity', name: 'custom block name' })}>
      {!isLoading && <div blockId="blockId" />}
    </div>
  )
}

// После вызова setIsLoading(false) установит в CurrentStateStorage.data: {
// ...,
// blocks: [..., {
//   id: 'blockId',
//   name: 'custom block name',
//   entityType: 'customItemEntity',
//   items: ['customItemId']
// }]
// }
```

#### Defined in

packages/react/src/useElementRef/useElementRef.ts:45

___

### usePageAnalytics

▸ **usePageAnalytics**(`«destructured»`, `isAppReady?`): `void`

Хелпер для отслеживания текущего состояния страницы, при навигации по приложению.

- сохраняет launchUrl в CurrentStateStorage.data на основе window.location.href (удаляет параметры access_token, vk_access_token_settings и sign);
- сохраняет source в CurrentStateStorage.data на основе window.location.href.searchParams.get('vkRef') (удаляет параметры access_token, vk_access_token_settings и sign);
- регистрирует screenOpenEventService.registerScreenListener при смене страницы
- при изменении зависимостей cleanUpDeps вызывает CurrentStateStorage.cleanUp

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `«destructured»` | [`UsePageAnalyticsParams`](README.md#usepageanalyticsparams) | `undefined` |
| `isAppReady` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

packages/react/src/usePageAnalytics/usePageAnalytics.ts:46