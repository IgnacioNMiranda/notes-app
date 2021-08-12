import { store, ReactNotificationOptions } from 'react-notifications-component';

export class NotificationUtil {
  static createNotification({
    title,
    message,
    type,
  }: {
    title: string;
    message: string;
    type: 'success' | 'danger' | 'info' | 'default' | 'warning' | undefined;
  }) {
    this.renderNotification({
      title,
      message,
      type,
      container: 'top-right',
    });
  }

  static renderNotification({
    title,
    message,
    type = 'success',
    insert = 'top',
    container = 'top-right',
    animationIn = ['animate__animated', 'animate__fadeInLeftBig'],
    animationOut = ['animate__animated', 'animate__fadeOut'],
    dismiss = {
      duration: 2500,
      onScreen: true,
    },
  }: ReactNotificationOptions) {
    store.addNotification({
      title,
      message,
      type,
      insert,
      container,
      animationIn,
      animationOut,
      dismiss,
    });
  }
}
