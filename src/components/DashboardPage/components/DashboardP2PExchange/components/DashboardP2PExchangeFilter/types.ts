import { TNullable } from "config/types";

import { EFilterTubs } from "../../types";

export type DashboardP2PExchangeFilterProps = {
  fixedDate: TNullable<EFilterTubs>
  setFixedDate: (val: TNullable<EFilterTubs>) => void
}