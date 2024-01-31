import { CurrentStateStorage } from '@vkontakte/mini-apps-analytics';
import { DependencyList, useEffect } from 'react';

export const useModalPageAnalytics = (modalPageName: string | null, deps: DependencyList = []) => {
  /**
   * Очищаем ранее собранную информацию по странице и инициируем новый сбор данных для страницы
   */
  useEffect(() => {
    if (!modalPageName) {
      return;
    }

    const source = CurrentStateStorage.getValue('screenName');

    /*
     * Смещаем установку данных по странице на следующий тик, иначе информация о странице обнулится раньше,
     * чем отработает обработчик tap события
     */
    setTimeout(() => {
      CurrentStateStorage.setPage(modalPageName);
      CurrentStateStorage.addPlainData<'source'>('source', source);
    }, 0);
  }, [modalPageName, ...deps]);
};
