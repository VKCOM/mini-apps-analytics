[@vkontakte/mini-apps-analytics](../README.md) / CustomData

# Interface: CustomData

Внутри пакета интерфейс CustomData пустой. Для того, чтобы была возможность расширить финальный тип информации о странице
([PageStateData](../README.md#pagestatedata)) данными, специфичными для Вашего приложение оставлена возможность доопределить интерйефс CustomData
стандартными инструментами TypeScript - с помощью практики module augmentation:

**`Example`**

```ts
import { setupOnEventSend } from '@vkontakte/mini-apps-analytics';
declare module '@vkontakte/mini-apps-analytics' {
    export interface CustomData {
        myAwesomeValue: string
    }
}

setupOnEventSend((eventData) => {
 type MyAwesomeValueType = (typeof eventData)['myAwesomeValue'] // string
 type UnknownValueType = (typeof eventData)['anyFieldYouWant'] // Compilation Error
})
```
