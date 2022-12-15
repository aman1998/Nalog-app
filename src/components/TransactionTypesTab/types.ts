import { TNullable } from "config/types";

export interface TransactionTypesTabProps<T> {
  tabsPane: TNullable<T>,
  handleTabs: (key: string) => void,
}
