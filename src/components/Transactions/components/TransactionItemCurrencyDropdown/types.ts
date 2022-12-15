import { TNullable } from "config/types";

export type TransactionItemCurrencyDropdownOptions = {
  icon: JSX.Element,
  value: string,
  active: boolean
}


export type TransactionItemCurrencyDropdownProps = {
  name: string;
  fiat?: boolean;
  defaultValue?: TNullable<string>;
  defaultOptions?: TransactionItemCurrencyDropdownOptions[];
  disabled?: boolean;
}