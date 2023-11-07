export type CommonEventData = {
  /**
   * client_time - Время события на клиенте
   */
  clientTime: Date;
  event: 'screen_open' | 'tap' | 'show' | 'launch';
  type: 'type_action' | 'type_navgo' | 'type_view' | 'type_click';
};
