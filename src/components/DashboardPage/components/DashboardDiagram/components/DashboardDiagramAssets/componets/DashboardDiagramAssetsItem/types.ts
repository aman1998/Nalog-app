import { ECurrency } from "config/types";

export type DashboardDiagramAssetsItemProps = {
  name: string;
  ratio: number;
  value: string;
  color: string;
  currency: ECurrency;
}