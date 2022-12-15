import { AxiosError } from "axios";
import { OutputSelector } from "reselect";

import { ECurrency, ETransactionsOperationsTypes, TNullable } from "config/types";

import { IApplicationState, IPaginationResponse, TRequestHandler } from "store/rootInterface";

import { TTransactionsFilterState } from "../filter/types";
import { ESubTypes } from "../assets/types";

export type TEditModalFormState = {
  title?: TNullable<string>;
  changeType?: boolean;
  external_amount?: TNullable<number>;
  srcAmount?: TNullable<number>;
  srcAsset?: TNullable<string>;
  dstAmount?: TNullable<number>;
  dstAsset?: TNullable<string>;
  fio?: TNullable<string>;
  date?: TNullable<string>;
}

export type TTransactionBlocksType = {
  leftBlock: string,
  rightBlock: string
}

export type TTransactionMenuList = {
  value: string,
  label: string
};

export type TBtnIconColors = {
  editIcon: TNullable<string>,
  fileIcon: TNullable<string>,
}

export type TTransactionInfo = {
  transactionName: TNullable<string>;
  transactionNameAction: TNullable<boolean>;
  subName: TNullable<string>;
  logoType: TNullable<string>;
  inputSubTitle: TNullable<string>;
  outputSubTitle: TNullable<string>;
  inputSource: TNullable<string>;
  outputSource: TNullable<string>;
  inputName: string;
  outputName: string;
  blocksType: TTransactionBlocksType;
  changeTypeList: TNullable<TTransactionMenuList[]>;
  btnIconColors: TBtnIconColors;
  showBtns: boolean;
  error: TNullable<boolean>;
  errorMsg: TNullable<string>;
  modalState?: TNullable<TEditModalFormState>;
  incomingOperation: TNullable<boolean>;
  isMarginTrading: TNullable<boolean>;
  isLoss?: boolean;
  longInputName?: boolean;
  longOutputName?: boolean;
};

export type TTransactionResult = {
  id: string;
  type: ETransactionsOperationsTypes;
  datetime: string;
  needs_details: boolean;
  cost_currency: ECurrency;

  src_account_id: TNullable<string>;
  src_account_name: TNullable<string>;
  src_sub_account_type: TNullable<ESubTypes>;
  src_asset: string;
  src_amount: number
  src_address: TNullable<string>;
  src_cost: TNullable<number>;

  exchange_symbol: string;
  exchange_rate: string;

  dst_account_id: TNullable<string>;
  dst_account_name: TNullable<string>;
  dst_sub_account_type: ESubTypes;
  dst_asset: string;
  dst_amount: number;
  dst_address: TNullable<string>;
  dst_cost: TNullable<number>;

  fee_asset: TNullable<string>;
  fee_amount: TNullable<number>;

  dst_extra_fio: TNullable<string>;
  src_extra_files: boolean;
  dst_extra_files: boolean;

  position_account_id: TNullable<string>; // ID аккаунта.
  position_account_name: TNullable<string>; // название аккаунта.
  position_symbol: TNullable<string>; // "символ" торгового инструмента.
  position_symbol_icon: TNullable<string>; // актив, используемый для обозначения иконки символа
  // (например, BTC для BTC-PERP или BTCUSDT). Здесь именно возвращаем не ссылку, а код валюты.
  position_base_asset: TNullable<string>; // базовая валюта актива.
  position_quote_asset: TNullable<string>; // валюты расчета.
  position_amount: TNullable<string>; // размер позиции. Отрицательное значение - шорт, положительное - лонг.
  position_opening_price: TNullable<string>; // цена открытия позиции. Присутствует всегда, если передается позиции.
  position_closing_price: TNullable<string>; // цена закрытия позиции. Передается лишь при закрытии позиции.
  position_closing_pnl: TNullable<string>; // сумма дохода (расхода) в валюте расчета.

  checked?: boolean;
  note: TNullable<string>;
  tags: [{ name: string }];

  formedInfo: TTransactionInfo;  // Данные сформированные после получения из API
};

export type TTransactionsData = IPaginationResponse<TTransactionResult>;

export interface ITransactionList {
  data: TTransactionResult[];
  lastElementFromPreviousPage: TNullable<TTransactionResult>;
  firstElementOfNextPage: TNullable<TTransactionResult>;
  fetching: boolean;
  finish: boolean;
  infiniteScroll?: boolean;
  next: TNullable<number>;
  count: TNullable<number>;
  size?: number;
  error?: AxiosError;
}

export type TTransactionState = TRequestHandler<TTransactionResult>


export interface IEditModal {
 id: TNullable<string>;
 title: TNullable<string>;
 date: TNullable<string>;
 type: TNullable<string>;
 isOpen?: boolean;
 changeType?: boolean;
 formState?: TNullable<TEditModalFormState>;
}

export type TEditConfirm = {
  title: TNullable<string>;
  id: TNullable<string>;
  type: TNullable<string>;
  isOpen?: boolean;
}

export type TSingleTransactionData = {
  new_type: string;
  external_counterparty: string;
  external_amount: number;
  external_asset: string;
  original_ext_amount: number;
  original_ext_asset: string;
  external_foreign: boolean;
  external_source_country: TNullable<string>;
  external_destination_country: TNullable<string>;
}

export type TEditSingleTransactionData = {
  external_counterparty?: string;
  external_amount?: number;
  external_asset?: string;
  new_type?: TNullable<string>,
  external_foreign?: TNullable<boolean>,
  external_source_country?: TNullable<string>,
  external_destination_country?: TNullable<string>,
}

export type TCreateSingleTransactionData = {
  fio?: string;
  type?: string;
  date: string;
  src_asset: string;
  src_amount: number;
  dst_asset: string;
  dst_amount: number;
  external_foreign: boolean;
  external_source_country: TNullable<string>;
  external_destination_country: TNullable<string>;
}

export type TUploadSingleTransactionFilesData = {
  file: string;
  name: string;
}

export type TSingleTransactionFilesListData = {
  id: string;
  operation_details: string;
  name: string;
  purpose: ETransactionsFilePurpose;
  file: string;
}

export type TTransactionDeleteFilesData = {
  files: string[]
}

export type TEditSingleTransactionPayload<T> = {
  id: string;
  values: T;
  deleteFiles?: string[];
  files?: ITransactionFilePayload[];
  closeIncomingOperationModal?: () => void;
}

export type TDeleteManualTransactionPayload = {
  id: string,
  callback?: () => void
}

export type TDownloadSingleTransactionFilesPayload = {
  id: string,
  file: File;
  name: string;
  purpose: string;
  onProgress?: (event: ProgressEvent, id: string) => void;
}

export type TSingleTransaction = TRequestHandler<TSingleTransactionData>

export type TDeleteManualTransactionState = TRequestHandler<{detail: string}>

export type TEditSingleTransaction = TRequestHandler<TEditSingleTransactionData>

export type TEditManualTransaction = TRequestHandler<TEditSingleTransactionData>

export type TCreateManualTransaction = TRequestHandler<TCreateSingleTransactionData>

export type TCreateManualTransactionPayload = {
  finalCall: () => void;
  values: TCreateSingleTransactionData;
  files: ITransactionFilePayload[];
}

export type TUploadSingleFileTransaction = TRequestHandler<TUploadSingleTransactionFilesData> & {
  progress: number;
}

export type TSingleTransactionFilesList = TRequestHandler<TSingleTransactionFilesListData[]>

export type TTransactionDeleteFilesOptions = {
  id: string,
  files: string[]
}

export type TTransactionDeleteFiles = TRequestHandler<TTransactionDeleteFilesData>

export interface IGetTransactionsListRequest extends TTransactionsFilterState {
  offset?: number;
  limit?: number;
  infiniteScroll?: boolean;
  callback?: (v?: any) => void;
}

export type TGetTransactionsListSuccess = {
  infiniteScroll?: boolean;
  limit: number;
  offset: number;
} & TTransactionsData

export type TTransactionOutputSelector<T> = OutputSelector<IApplicationState, T, (s: TTransactionStoreState) => T>;


export enum ETransactionsFilePurpose {
  purchaseTrade = "purchase_trade",
  purchasePayment = "purchase_payment",
  airdropAddress = "airdrop_address",
  airdropParticipation = "airdrop_participation",
  forkOccurred = "fork_occurred",
  forkAssetOwnership = "fork_asset_ownership",
  loanAgreement = "loan_agreement",
  serviceAgreement = "service_agreement",
  myTransferAddressOwnership = "my_transfer_address_ownership",
  miningActivty = "mining_activity",
  miningReward = "mining_reward",
  stakingActivity = "staking_activty",
  stakingReward = "staking_reward",
  stakingReturn = "staking_return",
  lendingActivity = "lending_activty",
  lendingReward = "lending_reward",
  lendingReturn = "lending_return",
  p2eActivity = "p2e_activity",
  p2eReward = "p2e_reward",
  giftAgreement = "gift_agreement",
  otherRewardReason = "other_reward_reason",
}

export interface ITransactionFilePayload {
  src: File;
  name: string;
  purpose: TNullable<ETransactionsFilePurpose>;
}

export interface IUploadMultipleTransactionFilesPayload {
  id: string;
  files: ITransactionFilePayload[];
  onProgress?: (event: ProgressEvent, id: string) => void;
  closeIncomingOperationModal?: () => void;
}

export type TEditTransactionNotePayload = {
  id: string;
  data: {
    note: string;
  }
  callOnSuccess?: (values?: any) => void;
}
export type TEditTransactionNoteData = {
  note: string;
}
export type TEditTransactionNoteState = TRequestHandler<TEditTransactionNoteData>

export type TEditTransactionTagPayload = {
  id: string;
  data: {
    tags: [{name: string}]
  }
  callOnSuccess?: (values?: any) => void;
}
export type TEditTransactionTagData = [{ name: string }]
export type TEditTransactionTagState = TRequestHandler<TEditTransactionTagData>

export type TAssetsTagsData = [{name: string}]
export type TAssetsTagsState = TRequestHandler<TAssetsTagsData>

export type TTransactionStoreState = {
  list: ITransactionList;
  transaction: TTransactionState;
  editModal: IEditModal;
  addModal: boolean;
  addModalType: TNullable<string>;
  editConfirm: TEditConfirm;
  singleTransactionState: Record<string, TSingleTransaction>;
  deleteManualTransactionState: Record<string, TDeleteManualTransactionState>;
  editSingleTransactionState: Record<string, TEditSingleTransaction>;
  createManualTransactionState: TCreateManualTransaction;
  editManualTransactionState: Record<string, TEditManualTransaction>;
  uploadSingleTransactionFilesState: Record<string, TUploadSingleFileTransaction>;
  singleTransactionFilesState: Record<string, TSingleTransactionFilesList>;
  deleteTransactionFilesState: TTransactionDeleteFiles;
  editTransactionNoteState: TEditTransactionNoteState;
  editTransactionTagState: TEditTransactionTagState;
  assetsTagsState: TAssetsTagsState;
  addModalStep: number;
};

export type TTransactionsOutputSelector<T> = OutputSelector<IApplicationState, T, (s: TTransactionStoreState) => T>;
