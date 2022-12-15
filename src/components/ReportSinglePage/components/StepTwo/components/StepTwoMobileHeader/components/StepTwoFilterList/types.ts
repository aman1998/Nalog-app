import { TTransactionsFilterState } from "store/filter/types";

export type StepTwoFilterListProps = {
  visible: boolean;
  headerFilters: TTransactionsFilterState;
  setHeaderFilter: (value: TTransactionsFilterState) => void;
}