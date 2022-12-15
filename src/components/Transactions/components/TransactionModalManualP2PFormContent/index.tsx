import { FC, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";

import { ETransactionsOperationsTypes } from "config/types";

import { BNDatePicker } from "components/BNDatePicker";
import BNNumericInput from "components/BNNumericInput";
import ArrowIcon from "components/Icons/ArrowDownIcon";
import BNInput from "components/BNInput";

import {
  transactionAddModalTypeSelector,
  createManualTransactionFailureSelector,
  transactionEditModalSelector,
} from "store/transactions/selectors";
import { createManualTransactionFailure } from "store/transactions/reducers";

import { useTransactionEditModalIsReport } from "../TransactionsEditModal/hooks";
import TransactionItemCurrencyDropdown from "../TransactionItemCurrencyDropdown";
import TransactionEditModalFormCountrySource
  from "../TransactionsEditModal/components/TransactionEditModalForm/components/TransactionEditModalFormCountrySource";

const TransactionModalManualP2PFormContent: FC = () => {
  const { t } = useTranslation();
  const typeAdd = useSelector(transactionAddModalTypeSelector);
  const { type: typeEdit, formState } = useSelector(transactionEditModalSelector);
  const failure = useSelector(createManualTransactionFailureSelector)?.parsedErrors;
  const isReport = useTransactionEditModalIsReport();

  const dispatch = useDispatch();

  const saleType = typeAdd === ETransactionsOperationsTypes.manualP2pSale ||
    typeEdit === ETransactionsOperationsTypes.manualP2pSale;

  const onFocus = () => {
    dispatch(createManualTransactionFailure(null));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => onFocus(), []);

  const disabledDate = (current: Moment) => {
    if (isReport) {
      let startDate = new Date('2021-01-01T00:00:00');
      const endDate = new Date('2021-12-31T23:00:00');

      if (typeAdd === ETransactionsOperationsTypes.manualP2pPurchase) {
        startDate = new Date('2020-01-01T00:00:00');
      }
      return (startDate.valueOf() > current.valueOf()) || (current.valueOf() > endDate.valueOf());
    }

    return current && current.valueOf() > Date.now();
  };

  return (
    <Fragment>
      <div className="transaction-manualP2P__form-date-wrapper">
        <div className="transaction-manualP2P__form-text-wrapper">
          <p className="transaction-manualP2P__form-text">{t("operations.date")}</p>
        </div>
        <BNDatePicker
          name="date"
          className="transaction-manualP2P__form-date"
          disabledDate={disabledDate}
          defaultPickerValue={isReport ? moment("2021-12-31") : moment()}
        />
      </div>
      {saleType &&
      <div className="transaction-manualP2P__form-fio-wrapper">
        <div className="transaction-manualP2P__form-text-wrapper">
          <p className="transaction-manualP2P__form-text">{t("transactionEditModalForm.sourceOfIncome")}</p>
        </div>
        <BNInput
          name="fio"
          onFocus={onFocus}
          error={failure?.fio}
          wrapperClass="transaction-manualP2P__form-fio--field-wrapper"
          className="transaction-manualP2P__form-fio"
          placeholder={t("transactionEditModalForm.externalCounterparty")}
        />
      </div>
      }
      {saleType && <TransactionEditModalFormCountrySource/>}
      <div className="transaction-manualP2P__form-text-wrapper">
        <p className="transaction-manualP2P__form-text">
          { saleType ? t("operations.numberCryptocurrencies") : t("operations.sentPerPurchase") }</p>
      </div>
      <div className="transaction-manualP2P__form-sum-wrapper">
        <BNNumericInput
          onFocus={onFocus}
          error={failure?.src_amount}
          name="src_amount"
          className="transaction-manualP2P__form-sum"
          widthComma={true}
        />
        <TransactionItemCurrencyDropdown name="src_asset" defaultValue={formState?.srcAsset} fiat={!saleType} />
      </div>
      <div className="transaction-manualP2P__form-arrow-icon-wrapper">
        <ArrowIcon />
      </div>
      <div className="transaction-manualP2P__form-text-wrapper">
        <p className="transaction-manualP2P__form-text">
          { saleType ? t("operations.receivedPerSale") : t("operations.cryptocurrenciesReceived") }</p>
      </div>
      <div className="transaction-manualP2P__form-sum-wrapper transaction-manualP2P__form-sum-wrapper--get">
        <BNNumericInput
          onFocus={onFocus}
          error={failure?.dst_amount}
          name="dst_amount"
          className="transaction-manualP2P__form-sum"
          widthComma={true}
        />
        <TransactionItemCurrencyDropdown name="dst_asset" defaultValue={formState?.dstAsset} fiat={saleType} />
      </div>
    </Fragment>
  );
};

export default TransactionModalManualP2PFormContent;
