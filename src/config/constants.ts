import HomeIcon from "components/Icons/HomeIcon";
import AssetsIcon from "components/Icons/AssetsIcon";
import ReportsIcon from "components/Icons/ReportsIcon";
import DocumentsIcon from "components/Icons/DocumentsIcon";
import RussianFlag from "components/Icons/Flags/ru";
import BritishFlag from "components/Icons/Flags/en";

import { ELanguages } from "../i18n/constants";

import {
  ETransactionsOperationsTypes,
  ETransactionsTypesRu,
  TLinks
} from "./types";
import { paths } from "./paths";

export const mobileMediaWidth = 575.98;
export const maxMobileMediaWidth = 767.98;
export const minTableMediaWidth = 768;
export const moreMdMedia = 868;
export const maxTableMediaWidth = 1024;
export const minLaptopMediaWidth = 1199;

export const TAX_REPORT_2021 = "tax_report_2021";
export const YOOKASSA = "yookassa";

export const transactionOperation = [
  ETransactionsOperationsTypes.tradeSpot,
  ETransactionsOperationsTypes.tradeOtc,
  ETransactionsOperationsTypes.cryptoTransfer,
  ETransactionsOperationsTypes.cryptoOutcome,
  ETransactionsOperationsTypes.cryptoIncome,
  ETransactionsOperationsTypes.p2pSale,
  ETransactionsOperationsTypes.p2pPurchase,
  ETransactionsOperationsTypes.fiatOutcome,
  ETransactionsOperationsTypes.fiatIncome,
  ETransactionsOperationsTypes.cryptoSale,
  ETransactionsOperationsTypes.cryptoPurchase,
  ETransactionsOperationsTypes.tradePositionOpening,
  ETransactionsOperationsTypes.tradePositionClosing,
  ETransactionsOperationsTypes.innerTransfer,
];

export const transactionOperationTypes = [
  { value: "", label: ETransactionsTypesRu.all },
  { value: ETransactionsOperationsTypes.tradeSpot, label: ETransactionsTypesRu.tradeSpot },
  { value: ETransactionsOperationsTypes.tradeOtc, label: ETransactionsTypesRu.tradeOtc },
  { value: ETransactionsOperationsTypes.cryptoTransfer, label: ETransactionsTypesRu.cryptoTransfer },
  { value: ETransactionsOperationsTypes.cryptoOutcome, label: ETransactionsTypesRu.cryptoOutcome },
  { value: ETransactionsOperationsTypes.cryptoIncome, label: ETransactionsTypesRu.cryptoIncome },
  { value: ETransactionsOperationsTypes.p2pSale, label: ETransactionsTypesRu.p2pSale },
  { value: ETransactionsOperationsTypes.p2pPurchase, label: ETransactionsTypesRu.p2pPurchase },
  { value: ETransactionsOperationsTypes.fiatOutcome, label: ETransactionsTypesRu.fiatOutcome },
  { value: ETransactionsOperationsTypes.fiatIncome, label: ETransactionsTypesRu.fiatIncome },
  { value: ETransactionsOperationsTypes.cryptoSale, label: ETransactionsTypesRu.cryptoSale },
  { value: ETransactionsOperationsTypes.cryptoPurchase, label: ETransactionsTypesRu.cryptoPurchase },
  { value: ETransactionsOperationsTypes.tradePositionOpening, label: ETransactionsTypesRu.tradePositionOpening },
  { value: ETransactionsOperationsTypes.tradePositionClosing, label: ETransactionsTypesRu.tradePositionClosing },
  { value: ETransactionsOperationsTypes.innerTransfer, label: ETransactionsTypesRu.innerTransfer },
];


export const NAVIGATION_LINKS: TLinks[] = [
  { id: 1, to: paths.HOME, icon: HomeIcon, title: "naming.dashboard", active: true  },
  { id: 2, to: paths.ASSETS, icon: AssetsIcon, title: "naming.exchangesAndWallets", active: true },
  { id: 3, to: paths.TRANSACTIONS, icon: ReportsIcon, title: "naming.operations", active: true },
  { id: 4,
    to: paths.DOCUMENTS,
    icon: DocumentsIcon,
    title: "naming.documents",
    active: process.env.REACT_APP_DOCUMENTS_DISABLED !== "true"
  },
  // {id: 4, to: paths.PROFILE, icon: ProfileIcon, title: 'Профиль', active: true},
];

export const colors = {
  main: "#748ADA",
  brown1: "#edd4c4",
  brown2: "#e1b79d",
  brown3: "#d59b76",
  brown4: "#c97e4f",
  brown5: "#b06536",
  brown6: "#894e2a",
  brown7: "#62381e",
  brown8: "#3b2212",
  brown9: "#21130a",

  gray1: "#ffffff",
  gray2: "#f3f4f9",
  gray3: "#eeeff3",
  gray4: "#e8e9f0",
  gray5: "#d7d8e0",
  gray6: "#b9bbc2",
  gray7: "#8c8d94",
  gray8: "#626368",
  gray9: "#232325",

  grayLight: "#fafafc",
  blue2: "#99ACF2",
  blue3: "#475DAF",
  error2: "#E5424C",
  green1: "#219653",
  green3: "#59bd83",
  red1: "#FFF1F0",
  red2: "#FFCCC7",
  red3: "#FFA39E",
  red4: "#ff7875",
  red5: "#ff4d4f",
  red6: "#e6424c",
  complementary: "#FF6D88",
  darkBlue: "#00d5d7",
  lightBlue: "#00e7e6",
  pink: "#D64686",
};


export const LANGUAGE_OPTIONS: Record<ELanguages, { nativeName: string, icon: () => JSX.Element }> = {
  [ELanguages.ruRU]: {
    nativeName: 'Руский',
    icon: RussianFlag
  },
  [ELanguages.enUS]: {
    nativeName: 'English',
    icon: BritishFlag
  },
};

export const QUERIES = {
  modal: "modal",
  transaction: "transaction",
  fromCreateExport: "fromCreateExport",
  createSourceId: "createSourceId",
  pricing: "pricing",
  plan: "plan",
  id: "id",
  title: "title",
};
