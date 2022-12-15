import { groupBy, sortBy } from "lodash";
import moment from "moment";

import { ECurrency, ETransactionsOperationsTypes, ETransactionsTypesRu } from "config/types";

import {
  ETransactionChangeTypeAction,
  ETransactionOperationType,
  ETransactionsIcon,
  OutputTitle
} from "components/Transactions/types";

import { TSingleTransactionFilesListData, TTransactionInfo, TTransactionResult } from "store/transactions/types";

import i18n from "../i18n";

import { formatAssetAmount, formatExchangeRate, formatWithCurrencies, } from "./fractions";
import { setDateTimeLocale } from "./dateHelpers";
import { getTextWidth } from "./text";

const NAME_WIDTH = 138;

interface Dictionary<T> {
  [Key: string]: T;
}

export const handleChangeTransactionType = (value: string): string => {
  switch (value) {
  case ETransactionsOperationsTypes.cryptoOutcomeSale:
  case ETransactionsOperationsTypes.cryptoIncomePurchase:
    return ETransactionChangeTypeAction.openModal;
  default:
    return ETransactionChangeTypeAction.openConfirm;
  }
};

export const getTransactionName = (value: string | undefined | null): string => {
  switch (value) {
  case ETransactionsOperationsTypes.manualP2pPurchase:
    return i18n.t(ETransactionsTypesRu.cryptoPurchase);
  case ETransactionsOperationsTypes.manualP2pSale:
    return i18n.t(ETransactionsTypesRu.cryptoSale);
  default: return "";
  }
};

export type TGetTransactionInfo = (values: TTransactionResult) => TTransactionInfo;

export const getTransactionInfo: TGetTransactionInfo = ({
  type,
  src_amount,
  src_account_name,
  dst_account_name,
  dst_address,
  src_address,
  dst_extra_fio,
  cost_currency,
  dst_cost,
  src_cost,
  exchange_symbol,
  exchange_rate,
  src_extra_files,
  dst_extra_files,
  position_account_name,
  position_amount,
  position_base_asset,
  src_asset,
  position_closing_pnl,
  dst_asset,
  position_quote_asset,
  dst_amount
}) => {
  const isMarginTrading = [
    ETransactionsOperationsTypes.tradePositionOpening,
    ETransactionsOperationsTypes.tradePositionClosing
  ].includes(type);

  const isIncomineOperation = [
    ETransactionsOperationsTypes.cryptoIncome,
    ETransactionsOperationsTypes.cryptoIncomeAirdrop,
    ETransactionsOperationsTypes.cryptoIncomeFork,
    ETransactionsOperationsTypes.cryptoIncomeLoan,
    ETransactionsOperationsTypes.cryptoIncomePurchase,
    ETransactionsOperationsTypes.cryptoIncomeMyTransfer,
    ETransactionsOperationsTypes.cryptoIncomePayment,
    ETransactionsOperationsTypes.cryptoIncomeMining,
    ETransactionsOperationsTypes.cryptoIncomeStakingReward,
    ETransactionsOperationsTypes.cryptoIncomeStakingReturn,
    ETransactionsOperationsTypes.cryptoIncomeLendingReward,
    ETransactionsOperationsTypes.cryptoIncomeLendingReturn,
    ETransactionsOperationsTypes.cryptoIncomeP2e,
    ETransactionsOperationsTypes.cryptoIncomeGift,
    ETransactionsOperationsTypes.cryptoIncomeOtherReward,
    ETransactionsOperationsTypes.p2pPurchase,
  ].includes(type);

  const formInputName = () => {
    const srcName = isMarginTrading
      ? formatAssetAmount(Number(position_amount), position_base_asset)
      : formatAssetAmount(src_amount, src_asset);
    return isMarginTrading ? srcName.replace("-", "") : `- ${srcName}`;
  };

  const isLoss = Boolean(isMarginTrading && Number(position_closing_pnl) && Number(position_closing_pnl) < 0);

  const formOuputName = () => isMarginTrading
    ? `${isLoss ? "-" : "+"} ${formatAssetAmount(Math.abs(Number(position_closing_pnl)), position_quote_asset)}`
    : `+ ${formatAssetAmount(dst_amount, dst_asset)}`;

  const info: TTransactionInfo = {
    transactionName: null, // Имя транзакции
    transactionNameAction: null,
    subName: null, // Имя транзакции
    showBtns: false, // Кнопки редактирования и файлов
    blocksType: {
      leftBlock: ETransactionOperationType.internal,
      rightBlock: ETransactionOperationType.internal,
    },
    inputSubTitle: null,
    outputSubTitle: null,
    inputSource: src_account_name,
    outputSource: dst_account_name,
    inputName: formInputName(),
    outputName: formOuputName(),
    logoType: null,
    changeTypeList: null, // Можно ли менять тип транзакции
    btnIconColors: { // Цвета иконок
      editIcon: null,
      fileIcon: null
    },
    error: false,
    errorMsg: null,
    modalState: null,
    incomingOperation: null,
    isLoss,
    isMarginTrading,
  };

  const getExchangeRateString = () => {
    if(exchange_symbol === null || exchange_rate === null) {
      return "";
    }

    return `${exchange_symbol} = ${formatExchangeRate(Number(exchange_rate))}`;
  };

  switch (type) {
  case ETransactionsOperationsTypes.cryptoTransfer: // Перевод
    info.transactionName = i18n.t(ETransactionsTypesRu.cryptoTransfer);
    info.outputSubTitle = `≈ ${formatWithCurrencies(dst_cost, cost_currency || ECurrency.rub)}`;
    info.logoType = ETransactionsIcon.transferIcon;
    break;

  case ETransactionsOperationsTypes.innerTransfer: // Внутренний еревод
    info.transactionName = i18n.t(ETransactionsTypesRu.innerTransfer);
    info.outputSubTitle = `≈ ${formatWithCurrencies(dst_cost, cost_currency)}`;
    info.logoType = ETransactionsIcon.transferIcon;
    break;

  case ETransactionsOperationsTypes.tradeSpot: // Торговля на спот
    info.transactionName = i18n.t(ETransactionsTypesRu.tradeSpot);
    info.inputSubTitle = getExchangeRateString();
    info.outputSubTitle = `≈ ${formatWithCurrencies(dst_cost, cost_currency || ECurrency.rub)}`;
    info.logoType = ETransactionsIcon.tradeIcon;
    break;

  case ETransactionsOperationsTypes.tradeOtc: // Обмен OTC
    info.transactionName = i18n.t(ETransactionsTypesRu.tradeOtc);
    info.inputSubTitle = getExchangeRateString();
    info.logoType = ETransactionsIcon.tradeIcon;
    break;

  case ETransactionsOperationsTypes.cryptoOutcome: // Вывод на кошелек
    info.transactionName = i18n.t(ETransactionsTypesRu.cryptoOutcome);
    info.inputSubTitle = `≈ ${formatWithCurrencies(src_cost, cost_currency || ECurrency.rub)}`;
    info.outputSubTitle = dst_address || "";
    info.logoType = ETransactionsIcon.arrowUp;
    info.changeTypeList = [
      { value: ETransactionsOperationsTypes.cryptoOutcomeSale,
        label: i18n.t(ETransactionsTypesRu.cryptoSale)
      },
      { value: ETransactionsOperationsTypes.cryptoOutcome, label: i18n.t(ETransactionsTypesRu.cryptoOutcome) }
    ];
    info.blocksType = {
      leftBlock: ETransactionOperationType.internal,
      rightBlock: ETransactionOperationType.external,
    };
    info.modalState = { title: i18n.t("operations.incomingOperation") };
    info.outputSource = i18n.t("operations.myWallet");
    break;

  case ETransactionsOperationsTypes.cryptoIncome: // Пополнение с кошелька
    info.transactionName = i18n.t(ETransactionsTypesRu.cryptoIncome);
    info.transactionNameAction = true;
    info.inputSubTitle = src_address || "";
    info.outputSubTitle = `≈ ${formatWithCurrencies(dst_cost, cost_currency || ECurrency.rub)}`;
    info.logoType = ETransactionsIcon.classifyOperationIcon;
    info.blocksType = {
      leftBlock: ETransactionOperationType.external,
      rightBlock: ETransactionOperationType.internal,
    };
    info.showBtns = true;
    info.btnIconColors = {
      editIcon: "red",
      fileIcon: "red"
    };
    info.modalState = { title: i18n.t("operations.incomingOperation") };
    info.incomingOperation = isIncomineOperation;
    info.inputName = i18n.t("operations.unknownFunds");
    break;

  case ETransactionsOperationsTypes.cryptoIncomePurchase: // Покупка криптовалюты
    info.transactionName = i18n.t(ETransactionsTypesRu.cryptoIncomePurchase);
    info.transactionNameAction = true;
    info.inputSubTitle = src_address || "";
    info.outputSubTitle = `≈ ${formatWithCurrencies(dst_cost, cost_currency)}`;
    info.logoType = ETransactionsIcon.arrowDown;
    info.blocksType = {
      leftBlock: ETransactionOperationType.external,
      rightBlock: ETransactionOperationType.internal,
    };
    info.showBtns = true;
    info.btnIconColors.editIcon = "blue";
    info.btnIconColors.fileIcon = src_extra_files ? "green" : "red";
    info.error = !src_extra_files;
    info.errorMsg = !src_extra_files ? i18n.t("operations.errorMgsSupportingDocuments") : null;
    info.modalState = { title: i18n.t("operations.incomingOperation") };
    info.incomingOperation = isIncomineOperation;
    info.inputSource = i18n.t("operations.myAccount");
    break;

  case ETransactionsOperationsTypes.cryptoIncomeAirdrop:
  case ETransactionsOperationsTypes.cryptoIncomeFork:
  case ETransactionsOperationsTypes.cryptoIncomeLoan:
  case ETransactionsOperationsTypes.cryptoIncomeMyTransfer:
  case ETransactionsOperationsTypes.cryptoIncomePayment:
  case ETransactionsOperationsTypes.cryptoIncomeMining:
  case ETransactionsOperationsTypes.cryptoIncomeStakingReward:
  case ETransactionsOperationsTypes.cryptoIncomeStakingReturn:
  case ETransactionsOperationsTypes.cryptoIncomeLendingReward:
  case ETransactionsOperationsTypes.cryptoIncomeLendingReturn:
  case ETransactionsOperationsTypes.cryptoIncomeP2e:
  case ETransactionsOperationsTypes.cryptoIncomeGift:
  case ETransactionsOperationsTypes.cryptoIncomeOtherReward: {

    let transactionNameCode = "";
    let inputNameCode = "";

    switch (type) {
    case ETransactionsOperationsTypes.cryptoIncomeAirdrop:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeAirdrop;
      inputNameCode = "operations.cryptoIncomeAirdrop_input";
      break;
    case ETransactionsOperationsTypes.cryptoIncomeFork:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeFork;
      inputNameCode = "operations.cryptoIncomeFork_input";
      break;
    case ETransactionsOperationsTypes.cryptoIncomeLoan:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeLoan;
      inputNameCode = "operations.cryptoIncomeLoan_input";
      break;
    case ETransactionsOperationsTypes.cryptoIncomeMyTransfer:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeMyTransfer;
      inputNameCode = "operations.cryptoIncomeMyTransfer_input";
      break;
    case ETransactionsOperationsTypes.cryptoIncomePayment:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomePayment;
      inputNameCode = "operations.cryptoIncomePayment_input";
      break;
    case ETransactionsOperationsTypes.cryptoIncomeMining:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeMining;
      break;
    case ETransactionsOperationsTypes.cryptoIncomeStakingReward:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeStakingReward;
      break;
    case ETransactionsOperationsTypes.cryptoIncomeStakingReturn:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeStakingReturn;
      break;
    case ETransactionsOperationsTypes.cryptoIncomeLendingReward:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeLendingReward;
      break;
    case ETransactionsOperationsTypes.cryptoIncomeLendingReturn:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeLendingReturn;
      break;
    case ETransactionsOperationsTypes.cryptoIncomeP2e:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeP2e;
      break;
    case ETransactionsOperationsTypes.cryptoIncomeGift:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeGift;
      break;
    case ETransactionsOperationsTypes.cryptoIncomeOtherReward:
      transactionNameCode = ETransactionsTypesRu.cryptoIncomeOtherReward;
      break;
    }

    if (inputNameCode === "") {
      inputNameCode = transactionNameCode;
    }

    info.transactionName = i18n.t(transactionNameCode);
    info.transactionNameAction = true;
    info.inputSubTitle = "";
    info.outputSubTitle = `≈ ${formatWithCurrencies(dst_cost, cost_currency)}`;
    info.logoType = ETransactionsIcon.arrowDown;
    info.blocksType = {
      leftBlock: ETransactionOperationType.external,
      rightBlock: ETransactionOperationType.internal,
    };
    info.showBtns = true;
    info.btnIconColors.editIcon = "blue";
    info.btnIconColors.fileIcon = src_extra_files ? "green" : "red";
    info.error = !src_extra_files;
    info.errorMsg = !src_extra_files ? i18n.t("operations.errorMgsSupportingDocuments") : null;
    info.modalState = { title: i18n.t("operations.incomingOperation") };
    info.incomingOperation = isIncomineOperation;
    info.inputName = i18n.t(inputNameCode);
    break;
  }

  case ETransactionsOperationsTypes.fiatOutcome: // Вывод на карту
    info.transactionName = i18n.t(ETransactionsTypesRu.fiatOutcome);
    info.logoType = ETransactionsIcon.arrowUp;
    info.blocksType = {
      leftBlock: ETransactionOperationType.internal,
      rightBlock: ETransactionOperationType.external,
    };
    info.outputSource = i18n.t("operations.myAccount");
    break;

  case ETransactionsOperationsTypes.fiatIncome: // Пополнение с карты
    info.transactionName = i18n.t(ETransactionsTypesRu.fiatIncome);
    info.logoType = ETransactionsIcon.arrowDown;
    info.blocksType = {
      leftBlock: ETransactionOperationType.external,
      rightBlock: ETransactionOperationType.internal,
    };
    info.inputSource = i18n.t("operations.myAccount");
    break;

  case ETransactionsOperationsTypes.p2pSale: // Продажа на P2P
    info.transactionName = i18n.t(ETransactionsTypesRu.p2pSale);
    info.inputSubTitle = getExchangeRateString();
    if(!!dst_extra_fio) {
      info.outputSubTitle = dst_extra_fio;
      info.btnIconColors.editIcon = "blue";
    }
    if(!dst_extra_fio) {
      info.outputSubTitle = OutputTitle.unknown;
      info.btnIconColors.editIcon = "red";
    }
    if(dst_extra_files) {
      info.btnIconColors.fileIcon = "green";
    }
    if(!dst_extra_files) {
      info.btnIconColors.fileIcon = "gray";
    }
    info.logoType = ETransactionsIcon.arrowUp;
    info.showBtns = true;
    info.blocksType = {
      leftBlock: ETransactionOperationType.internal,
      rightBlock: ETransactionOperationType.external,
    };
    info.outputSource = i18n.t("operations.myAccount");
    break;

  case ETransactionsOperationsTypes.p2pPurchase: // Покупка на P2P
    info.transactionName = i18n.t(ETransactionsTypesRu.p2pPurchase);
    info.inputSubTitle = getExchangeRateString();
    info.logoType = ETransactionsIcon.arrowDown;
    info.showBtns = true;
    info.blocksType = {
      leftBlock: ETransactionOperationType.external,
      rightBlock: ETransactionOperationType.internal,
    };
    info.btnIconColors.editIcon = "blue";
    info.btnIconColors.fileIcon = src_extra_files ? "green" : "red";
    info.modalState = { title: i18n.t(ETransactionsTypesRu.p2pPurchase), external_amount: src_amount };
    info.incomingOperation = isIncomineOperation;
    info.inputSource = i18n.t("operations.myAccount");
    break;

  case ETransactionsOperationsTypes.cryptoOutcomeSale: // Продажа физ. лицу
    info.transactionName = i18n.t(ETransactionsTypesRu.cryptoSale);
    info.inputSubTitle = getExchangeRateString();
    if(dst_extra_fio) {
      info.outputSubTitle = dst_extra_fio;
      info.btnIconColors.editIcon = "blue";
    }
    if(!dst_extra_fio) {
      info.outputSubTitle = OutputTitle.unknown;
      info.btnIconColors.editIcon = "red";
    }
    if(dst_extra_files) {
      info.btnIconColors.fileIcon = "green";
    }
    if(!dst_extra_files) {
      info.btnIconColors.fileIcon = "gray";
    }
    info.logoType = ETransactionsIcon.arrowUp;
    info.showBtns = true;
    info.changeTypeList = [
      { value: ETransactionsOperationsTypes.cryptoOutcomeSale,
        label: i18n.t(ETransactionsTypesRu.cryptoSale)
      },
      { value: ETransactionsOperationsTypes.cryptoOutcome, label: i18n.t(ETransactionsTypesRu.cryptoOutcome) }
    ];
    info.blocksType = {
      leftBlock: ETransactionOperationType.internal,
      rightBlock: ETransactionOperationType.external,
    };
    info.outputSource = i18n.t("operations.myWallet");
    break;

  case ETransactionsOperationsTypes.manualP2pSale: // Продажа в P2P обменнике
    info.transactionName = i18n.t(ETransactionsTypesRu.cryptoSale);
    info.inputSubTitle = getExchangeRateString();

    if(dst_extra_fio) {
      info.outputSubTitle = dst_extra_fio;
      info.btnIconColors.editIcon = "blue";
    }
    if(!dst_extra_fio) {
      info.outputSubTitle = OutputTitle.unknown;
      info.btnIconColors.editIcon = "red";
    }
    if(dst_extra_files) {
      info.btnIconColors.fileIcon = "green";
    }
    if(!dst_extra_files) {
      info.btnIconColors.fileIcon = "gray";
    }

    info.logoType = ETransactionsIcon.arrowUp;
    info.showBtns = true;
    info.blocksType = {
      leftBlock: ETransactionOperationType.internal,
      rightBlock: ETransactionOperationType.external,
    };
    info.outputSource = i18n.t("operations.myAccount");
    break;

  case ETransactionsOperationsTypes.manualP2pPurchase: // Покупка в P2P обменнике
    info.transactionName = i18n.t(ETransactionsTypesRu.cryptoPurchase);
    info.inputSubTitle = getExchangeRateString();
    info.logoType = ETransactionsIcon.arrowDown;
    info.showBtns = true;
    info.blocksType = {
      leftBlock: ETransactionOperationType.external,
      rightBlock: ETransactionOperationType.internal,
    };
    info.btnIconColors.editIcon = "blue";
    if(src_extra_files) {
      info.btnIconColors.fileIcon = "green";
    }
    if(!src_extra_files) {
      info.btnIconColors.fileIcon = "red";
    }
    info.inputSource = i18n.t("operations.myAccount");
    break;

  case ETransactionsOperationsTypes.tradePositionOpening:
    info.subName = i18n.t("operations.marginTrading");
    info.transactionName = i18n.t(ETransactionsTypesRu.tradePositionOpening);
    info.logoType = ETransactionsIcon.marginTradingOpening;
    info.outputSubTitle = `≈ ${formatWithCurrencies(dst_cost, cost_currency || ECurrency.rub)}`;
    info.inputSource = position_account_name;
    break;
  case ETransactionsOperationsTypes.tradePositionClosing:
    info.subName = i18n.t("operations.marginTrading");
    info.transactionName = i18n.t(ETransactionsTypesRu.tradePositionClosing);
    info.logoType = ETransactionsIcon.marginTradingClosing;
    info.inputSource = position_account_name;
    info.outputSubTitle = `≈ ${formatWithCurrencies(dst_cost, cost_currency || ECurrency.rub)}`;
    break;
  }

  return {
    ...info,
    longInputName: getTextWidth(info.inputName, "500 14px Roboto,sans-serif") > NAME_WIDTH,
    longOutputName: getTextWidth(info.outputName, "500 14px Roboto,sans-serif") > NAME_WIDTH
  };
};

export const handleFileValidate = (files: File[], listFiles?: TSingleTransactionFilesListData[] | null): boolean => {
  const isFileHasLongName = files.some(item => item.name.trim().length > 100);
  return (files.length + (listFiles?.length || 0)) > 3 || isFileHasLongName;
};

export const getGroupedTransactions = <T extends { datetime: string }>(transactions: T[]): Dictionary<[...T[]]> => {
  setDateTimeLocale();
  const sort = sortBy(transactions, "datetime");
  return groupBy(sort.reverse(), e => moment(e.datetime).locale(i18n.language).format("DD MMMM YYYY"));
};
