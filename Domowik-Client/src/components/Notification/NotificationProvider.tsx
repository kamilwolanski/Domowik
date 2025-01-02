import React, { ReactNode } from 'react';
import { notification } from 'antd';
import { NotificationContext } from './NotificationContext';

interface INotificationProvider {
  children: ReactNode;
}

const NotificationProvider: React.FC<INotificationProvider> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationSuccess = (
    message: ReactNode,
    description: ReactNode,
  ) => {
    api.success({
      message: message,
      description: description,
      placement: 'bottomLeft',
    });
  };

  const openNotificationError = (
    message?: ReactNode,
    description?: ReactNode,
  ) => {
    api.error({
      message: message ? message : 'Coś poszło nie tak',
      description: description ? description : 'Spróbuj ponownie później',
      placement: 'bottomLeft',
    });
  };

  const contextValue = { openNotificationSuccess, openNotificationError };

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
