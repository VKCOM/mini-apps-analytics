import { CurrentStateStorage, type PageStateData, type PlainDataKey } from '@vkontakte/mini-apps-analytics';
import { useEffect } from 'react';

/**
 * Устанавливает значение по заданному ключу(field) в CurrentStateStorage.data[field].
 * При анмаунте удаляет значение из CurrentStateStorage.data[field]
 */
export const useAddPlainData = <K extends PlainDataKey>(key: K, value?: PageStateData[K], keepValue = false) => {
  /** При изменении значения заменяем сохраненное в CurrentStateStorage значение по ключу */
  useEffect(() => {
    CurrentStateStorage.addPlainData(key, value);

    return () => {
      if (!keepValue) {
        CurrentStateStorage.addPlainData(key, undefined);
      }
    };
  }, [value, keepValue]);
};
