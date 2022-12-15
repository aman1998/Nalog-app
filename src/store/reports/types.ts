import { AxiosError } from "axios";
import { OutputSelector } from "reselect";
import { Moment } from "moment";

import { AxiosDataError } from "API/types";

import { TNullable, EStatus, ECurrency, ETransactionsOperationsTypes } from "config/types";

import { TMyAssetsData } from "store/assets/types";
import { TTransactionsFilterState } from "store/filter/types";
import { TTransactionResult } from "store/transactions/types";

import { ELanguages } from "../../i18n/constants";

import { IApplicationState, IPaginationResponse, TRequestHandler } from "../rootInterface";

export enum ESingleTaxReportTransactionStatus {
  not_formed = "not_formed",
  forming = "forming",
  formed = "formed",
  confirmed = "confirmed",
  error = "error"
}

export enum EReportTransactionType {
  all = "all",
  income = "income",
  outcome = "expense",
  manual = "manual",
  detailsRequired = "details_required",
  filter = "filter"
}

export enum EReportTransactionTypeRu {
  all = "operations.allOperations",
  income = "operations.profitable",
  outcome = "operations.consumables",
  manual = "operations.addedManually",
  detailsRequired = "operations.unconfirmed",
  filter = "naming.filter"
}


export type TReportData = {
  next?: TNullable<number>;
  previous?: TNullable<number>;
  count?: number;
  results: TReport[];
};

export type TSingleReportPayload = {
  id: string,
  redirect?: (id: string) => void
  callback?: () => void
}

export type TReport = {
  id: string;
  user: string;
  status: EStatus;
  documents: TDocument[];
  created_at: string;
  name: string;
  type: string;
  updated_at?: string;
};

export type TDocument = {
  id: TNullable<string>;
  report: string;
  name: string;
  doc_type: string;
  tag?: string;
  file: TNullable<string>;
  status: EStatus;
};

export type TReportsState = TRequestHandler<TReportData>

export type TNewReportOptionData = {
  ifns: string;
  oktmo: string;
  inn: string;
  first_name: string;
  last_name: string;
  middle_name: TNullable<string>;
  birthdate: TNullable<string>;
  phone: string;
  passport_series?: string;
  passport_number?: string;
};

export type TOldReportOptionData = {
  year: number;
  tax_authority: string;
  oktmo_code?: string;
  inn: string;
  first_name: string;
  last_name: string;
  patronymic_name: TNullable<string>;
  birth_date: string;
  birth_place: string;
  phone: string;
  passport_series?: string;
  passport_number?: string;
  passport_issued_by: string;
  passport_date_issued: string;
};

export type TOldReportOptions = {
  data: TOldReportOptionData;
  callOnSuccess: () => void;
};

export type TNewReportData = {
  detail: string;
};

export type TNewReportState = TRequestHandler<TNewReportData>

export type TReportDeleteState = TRequestHandler<TNewReportData>

export type TReportModalsState = {
  create: boolean;
  continueCreate: boolean;
  cancelCreate: boolean;
  success: boolean;
  draft: boolean;
  cancel: boolean;
  stepTwoUnconfirmedOperation: boolean;
};

export type TReportTaxAmountData = {
  year: number;
  amount: string;
  income: string;
  currency: ECurrency;
}

export type TReportTaxAmount = TRequestHandler<TReportTaxAmountData[]>

export type THintTextData = {
  visible: boolean,
  title: TNullable<string>
}

export type THintText = TRequestHandler<THintTextData>

export type THintTextPayload = {
  hint_code: string,
  visible: boolean
}

export type TCreateDocumentStepOne = {
  assetsCheckList: string[],
  synchronizedList: string[],
  assetsList: {
    fetching: boolean;
    data: TMyAssetsData[];
    failure: TNullable<AxiosDataError>;
  },
  includeManuals: boolean
}

export enum ECreateDocumentSteps {
  one=1,
  two=2,
  three=3
}

export type TCreateDocument = {
  currentStep: ECreateDocumentSteps;
  stepOne: TCreateDocumentStepOne;
  isAnonymous: boolean;
}

export type TCreateTaxReportingProjectPayload = {
  accounts: string[],
  year: string,
  redirect: (id: string) => void,
  include_manuals: boolean
}

export type TCreateTaxReportingProjectData = {
  report_id: string
}

export type TCreateTaxReportingProject = TRequestHandler<TCreateTaxReportingProjectData>

export type TSingleTaxReportData = {
  include_manuals: boolean;
  transactions_status: string;
  personal_data_status: string;
  accounts: string[];
  status: string;
  id: string;
  created_at: string;
  updated_at: string;
};

export type TSingleTaxReportsState = TRequestHandler<TSingleTaxReportData>

export type TSinglePersonalData = TRequestHandler<TNewReportOptionData>

export type TReportTransactionResult = {
  checked: boolean,
  tax_report_transaction_id: string
} & TTransactionResult;

export type TReportTransactionsData = IPaginationResponse<TReportTransactionResult>;

export interface IreportTransactionsSuccess {
  page: number;
  data: TReportTransactionResult[];
  next: number | null;
  count: TNullable<number>;
}

export type TGetReportTransactionsPayload = {
  id: string,
  page: number;
  type: string;
  size: number;
  isResult?: boolean;
} & TTransactionsFilterState

export type TReportTransaction = {
  data: TReportTransactionResult[];
  fetching: boolean;
  finish: boolean;
  next: number | null;
  allCheck: boolean;
  count: TNullable<number>;
  report_type: string;
  error?: AxiosError;
}

export type TReportTransactionType = {
  type: string,
  count: number,
}

export type ReportTaxTransactionTypes = {
  checked: number
} & TReportTransactionType

export type TReportTaxTransactionTypesStateData = {
  types: ReportTaxTransactionTypes[]
}

export type TResultReportTaxTransactionStateData = {
  types: TReportTransactionType[]
}

export type TReportTaxTransactionTypesState = TRequestHandler<TReportTaxTransactionTypesStateData>

export type TResultReportTaxTransactionState = TRequestHandler<TResultReportTaxTransactionStateData>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TReportAgreement = TRequestHandler<any> // TODO: need up

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TChangeReportCheckStatusData = any; // TODO: need up

export type TChangeReportCheckStatusPayload = {
  id: string,
  checked: boolean
}

export type TChangeReportCheckStatus = TRequestHandler<TChangeReportCheckStatusData>

export type TAllChangeReportCheckStatusData = {
  checked: boolean;
  type: string
}

export type TAllChangeReportCheckStatusPayload = {
  id: string
} & TAllChangeReportCheckStatusData;

export type TAllChangeReportCheckStatus = TRequestHandler<TAllChangeReportCheckStatusData>

export type TCreatePersonalDataPayload = {
  id: string;
  isAnonymous: boolean;
} & TNewReportOptionData;

export type TCreatePersonalData = TRequestHandler<TNewReportOptionData>;

export type TCreatePersonalDataComplete = TRequestHandler<TNewReportOptionData>;

export type TGetReportsFormedData = {
  files: TDocument[];
  tax_amount: number;
  tax_base: number;
  total_expenses: number;
  income: number;
}

export type TGetReportsFormed = TRequestHandler<TGetReportsFormedData>;

export type TUpdateTaxReportAccountsPayload = {
  id: string;
  changeStepCallback: () => void;
  accounts: string[];
  include_manuals: boolean;
}

export type TUpdateTaxReportAccounts = TRequestHandler<TCreateTaxReportingProjectData>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TDeleteSingleTaxReport = TRequestHandler<any>; // TODO: need type

export type TSingleTaxReportState = Record<string, TSingleTaxReportsState>

export type TAddTransactionToTaxReportOptions = {
  report_id: string;
  data: {transaction_id: string}
}

export type TAddTransactionToTaxReportData = {
  detail: string
}

export type TAddTransactionToTaxReportState = TRequestHandler<TAddTransactionToTaxReportData>

export enum TCreateTransitionExportSteps {
  one = 1,
  two = 2,
  three = 3
}

export type TCreateTransitionExportStepOne = {
  assetsCheckList: string[]|null,
  synchronizedList: string[],
  assetsList: {
    fetching: boolean;
    data: TMyAssetsData[];
    failure: TNullable<AxiosDataError>;
  },
  includeManuals: boolean
}

export type TCreateTransitionExportStepTwo = {
  language?: TNullable<ELanguages>,
  date_from?: TNullable<Moment>,
  date_to?: TNullable<Moment>,
  types?: ETransactionsOperationsTypes[]
}

export type TCreateTransitionExport = {
  currentStep: TCreateTransitionExportSteps;
  stepOne: TCreateTransitionExportStepOne;
  stepTwo: TCreateTransitionExportStepTwo;
}

export type TCreateTransactionExportOptions = {
  report_id?: string;
  accounts: string[];
  date_from: string;
  date_to: string;
  types: string[];
  language: ELanguages;
}

export type TCreateTransactionExportData = {
  id: string;
}

export type TCreateTransactionExportState = TRequestHandler<TCreateTransactionExportData>

export enum EReportType {
  tax_report_old = "tax_report_old",
  tax_report = "tax_report",
  transaction_export = "transaction_export",
  sources_export = "sources_export",
}
export enum EReportStatus {
  formed = "formed",
  forming = "forming",
  error = "error",
  draft = "draft"
}
export type TReportSingleData = {
  name: string;
  type: EReportType;
  status: EReportStatus;
  files: TDocument[];
  formed_at: string;
}
export type TReportSingleState = TRequestHandler<TReportSingleData> & { initialLoading: boolean }

export type TCreateSourcesExportOptions = TCreateTransactionExportOptions;
export type TCreateSourcesExportData = {
  id: string;
}
export type TCreateSourcesExportState = TRequestHandler<TCreateSourcesExportData>

export type TReportsStoreState = {
  reportsState: TReportsState;
  singleTaxReport: TSingleTaxReportState;
  singlePersonalData: Record<string, TSinglePersonalData>;
  createPersonalData: TCreatePersonalData;
  deleteSingleTaxReport: TDeleteSingleTaxReport;
  deleteSingleTaxReportConfirmedModal: boolean;
  createPersonalDataComplete: TCreatePersonalDataComplete;
  newReportState: TNewReportState;
  deleteReportState: TReportDeleteState;
  modalsState: TReportModalsState;
  taxAmountReport: TReportTaxAmount;
  hintText: THintText & { visible: boolean },
  changeHintTextStatus: THintText,
  createDocument: TCreateDocument,
  createTransitionExport: Record<string, TCreateTransitionExport>,
  createTaxReportingProject: TCreateTaxReportingProject,
  updateTaxReportAccounts: TUpdateTaxReportAccounts,
  reportTransactions: TReportTransaction;
  reportTaxTransactionTypesState: TReportTaxTransactionTypesState;
  reportTaxResultTransactionTypesState: TResultReportTaxTransactionState;
  reportAgreement: TReportAgreement;
  changeReportCheckStatus: Record<string, TChangeReportCheckStatus>;
  changeAllReportCheckStatus: TAllChangeReportCheckStatus;
  reportsFormed: TGetReportsFormed;
  addTransactionToTaxReportState: TAddTransactionToTaxReportState;
  createTransactionExportState: TCreateTransactionExportState;
  createSourcesExportState: TCreateSourcesExportState;
  reportSingleState: TReportSingleState;
};

export type TReportDelete = {
  id: string;
};

export type TReportsOutputSelector<T> = OutputSelector<IApplicationState, T, (s: TReportsStoreState) => T>;
