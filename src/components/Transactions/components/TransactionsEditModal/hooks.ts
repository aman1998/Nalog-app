import { createContext, useContext } from "react";

export const TransactionEditModalIsReportContext = createContext<boolean|undefined>(undefined);

export const useTransactionEditModalIsReport = (): boolean|undefined => useContext(TransactionEditModalIsReportContext);
