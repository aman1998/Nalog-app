import { ECurrency } from "config/types";

export type DashboardAssetsItemProps = {
  name: string;
  amount?: string;
  value: string;
  currency: ECurrency;
}
