import { CurrentStateStorage } from '@vkontakte/mini-apps-analytics';
import { useEffect, useMemo } from 'react';

/**
 * Хелпер для сохранения параметров на момент запуска приложения.
 *
 * - сохраняет launchUrl в CurrentStateStorage.data на основе window.location.href (удаляет параметры access_token, vk_access_token_settings и sign)
 * - устанавливает первичный source в CurrentStateStorage.data на основе window.location.href.searchParams.get('vkRef')
 *
 */
export const useInitLaunchAnalyticsValues = () => {
  const url = useMemo(() => new URL(window.location.href), []);
  const vkRef = url.searchParams.get('vk_ref');

  /** При инициализации приложения устанавливаем launchUrl */
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('access_token');
    url.searchParams.delete('vk_access_token_settings');
    url.searchParams.delete('sign');
    CurrentStateStorage.addPlainData<'launchUrl'>('launchUrl', url.href);
  }, []);

  /** При инициализации приложения устанавливаем значение source на основе vkRef значения   */
  useEffect(() => {
    if (vkRef && !CurrentStateStorage.getValue('source')) {
      CurrentStateStorage.addPlainData<'source'>('source', vkRef);
    }
  }, [vkRef]);
};
