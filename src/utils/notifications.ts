import { notification } from "antd";

export const showError = (text: string, description?: string): void => {
  notification.error({ message: text, description });
};

export const showSuccess = (text: string): void => {
  notification.success({ message: text });
};

export const showInfo = (text: string): void => {
  notification.info({ message: text });
};

export const clearNotification = (): void => {
  notification.destroy();
};
