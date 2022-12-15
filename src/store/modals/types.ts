import { OutputSelector } from "reselect";

import { IApplicationState } from "../rootInterface";

export enum EModals {
  activateServiceModal = "activateService",
  dashboardSymbolsSetSequence = "dashboardSymbolsSetSequence",
  documentCreateModal = "documentCreateModal",
  incomingOperation = "incomingOperation",
  transactionEditNote = "transactionEditNote",
  transactionEditTag = "transactionEditTag",
  activatePricing = "activatePricing",
  planAndPaymentUnsubscribe = "planAndPaymentUnsubscribe",
  planAndPaymentPreOrderDelete = "planAndPaymentPreOrderDelete",
  planAndPaymentPrePurchaseHistory = "planAndPaymentPrePurchaseHistory",
  planAndPaymentDeletePaymentMethod = "planAndPaymentDeletePaymentMethod",
}

export type ToggleModalActionPayload = {
  modal: EModals,
  visible: boolean
}

export type TModalsStoreState = {[key in EModals]?: boolean};


export type TModalsOutputSelector<T> = OutputSelector<IApplicationState, T, (s: TModalsStoreState) => T>;
