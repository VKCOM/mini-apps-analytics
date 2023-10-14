import { useCallback, useContext, useEffect, useRef } from 'react';

import { analyticsContext } from '../context';

/**
 * Регистрирует IntersectionObserver на элементе с помощью вызова ShowEventService.register.
 * При анмаунте элемента отписывается от IntersectionObserver.
 * */
export const useElementShowRef = <T extends HTMLElement>(): ((el: T) => void) => {
  const unregisterCbRef = useRef<() => void>();
  const elementRef = useRef<T>();
  const { showEventService, isShowElementEventActive } = useContext(analyticsContext);

  /* Сохраняем реф на элемент */
  const register = useCallback((el: T) => {
    elementRef.current = el;
  }, []);

  /* При изменении значения из контекста  */
  useEffect(() => {
    /*
     * При открытии/закрытии модалки есть длинетльность анимации и модалка считается еще открытой, потому информация о
     * блоках еще не актуализирована в хранилище состояния страницы. Дожидаемся окончания анимации
     */
    setTimeout(() => {
      if (isShowElementEventActive && elementRef.current) {
        unregisterCbRef.current = showEventService.register(elementRef.current);
      }
    }, 500);

    return () => {
      unregisterCbRef.current && unregisterCbRef.current();
    };
  }, [register, showEventService, isShowElementEventActive]);

  return register;
};
