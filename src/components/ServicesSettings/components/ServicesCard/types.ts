import { ESettingsServicesStatus } from "store/services/types";

export type ServicesCardProps = {
  title: string;
  description: string;
  connected: boolean;
  state?: ESettingsServicesStatus;
  className?: string;
};
