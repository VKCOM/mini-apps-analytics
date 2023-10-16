# @vkontakte/mini-apps-analytics-react

React-хуки для работы с пакетом @vkontakte/mini-apps-analytics

## Overview

Включает хуки для работы:

- Трекинг блоков на странице (useBlockRef)
- Трекинг элементов на странице (useElementRef)
- Трекинг события show для эдемента (useShowRef)
- Трекинг навигации по приложению (usePageAnalytics)
- Хук для простого изменения данных в CurrentStateStorage.data (useAddPlainData)
- React-контекст для установки кастомных конфигураций

## Зависимости

Зависит от [core пакета](../react) @vkontakte/mini-apps-analytics

## API Документация

API Документация находится [здесь](./docs/README.md)

## Установка

Для работы необходимо установить core пакет и пакет с react-хелперами

> yarn add @vkontakte/mini-apps-analytics @vkontakte/mini-apps-analytics-react

## Использования и инициализации аналитики

С примером использования и инициализации можно ознакомиться [здесь](./example/analytics.example.tsx)