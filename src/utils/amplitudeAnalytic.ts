import amplitude from "amplitude-js";

import { TNullable } from "config/types";

import { EEventType } from "store/analytics/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initAmplitude = (userId?: string): void => {
  if (process.env.REACT_APP_AMPLITUDE_ID) {

    const options: Record<string, any> = {};
    if (process.env.REACT_APP_AMPLITUDE_ENDPOINT) {
      options.apiEndpoint = process.env.REACT_APP_AMPLITUDE_ENDPOINT;
    }

    amplitude.getInstance().init(
      process.env.REACT_APP_AMPLITUDE_ID as string,
      userId,
      options
    );
  }
};

export const setAmplitudeUserDevice = (installationToken: string): void => {
  if (process.env.REACT_APP_AMPLITUDE_ID) amplitude.getInstance().setDeviceId(installationToken);
};

export const setAmplitudeRegenerateDeviceId = (): void  => {
  if (process.env.REACT_APP_AMPLITUDE_ID) amplitude.getInstance().regenerateDeviceId();
};

export const setAmplitudeUserId = (userId: string | null): void  => {
  if (process.env.REACT_APP_AMPLITUDE_ID) amplitude.getInstance().setUserId(userId);
};

export const setAmplitudeUserProperties = <T>(properties: T): void  => {
  if (process.env.REACT_APP_AMPLITUDE_ID) amplitude.getInstance().setUserProperties(properties);
};

export const sendAmplitudeEvent = <T>(eventType: EEventType | string, eventProperties?: TNullable<T>): void  => {
  if (process.env.REACT_APP_AMPLITUDE_ID) amplitude.getInstance().logEvent(eventType, eventProperties);
};
