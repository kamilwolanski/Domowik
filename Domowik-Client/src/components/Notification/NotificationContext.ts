import { createContext, ReactNode } from 'react';

interface NotificationContextType {
  openNotificationSuccess: (
    message: string | ReactNode,
    description: ReactNode,
  ) => void;
  openNotificationError: (message?: ReactNode, description?: ReactNode) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
