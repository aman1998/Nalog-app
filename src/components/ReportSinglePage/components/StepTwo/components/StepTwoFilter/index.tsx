import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth, transactionOperationTypes } from "config/constants";

import {
} from "components/Transactions/types";
import Select from "components/Select";
import RangeDatePicker from "components/RangeDatePicker";

import {
  getAssetsExchangeSymbolsDataSelector,
} from "store/assets/selectors";
import { getFilterTransactionSelector, getSelectedDatesSelector } from "store/filter/selectors";
import { setFilterTransactions, setFilterTransactionsDefault, setSelectedDates } from "store/filter/reducers";

import animateScrollTo from "utils/animateScrollTo";

import { useAssetsExchangeSymbolsSelect, useAssetsSelect } from "./hooks";
import { reportTransactionTypesOperation } from "./constants";

const StepTwoFilter: FC = () => {
  const { t } = useTranslation();
  const assetsExchangeSymbolsData = useSelector(getAssetsExchangeSymbolsDataSelector);
  const filterState = useSelector(getFilterTransactionSelector);
  const selectedDate = useSelector(getSelectedDatesSelector);
  const [assetsSelectOptions, assetsLazyLoad, assetsSelectOptionsLoading] = useAssetsSelect();
  const [
    assetsExchangeAssetsOptions,
    assetsExchangeSymbolsLazyLoad,
    assetsExchangeAssetsOptionsLoading
  ] = useAssetsExchangeSymbolsSelect();

  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  const handleChange = (value: Record<string, unknown>): void => {
    dispatch(setFilterTransactions({
      ...filterState,
      ...value,
      page: 1,
    }));
    if (!isMobile) {
      animateScrollTo(0, 500);
    }
  };

  const resetTransactionsFilter = () => {
    dispatch(setSelectedDates(null));
    dispatch(setFilterTransactionsDefault());
  };

  const handleDatePicker = (value: RangeValue<Moment>) => {
    if (value?.length && value.length > 1) {
      dispatch(setSelectedDates([value[0], value[1]]));
      handleChange({
        date_from: value[0] && moment(value[0]).format("L"),
        date_to: value[1] && moment(value[1]).format("L"),
      });
    } else {
      dispatch(setSelectedDates(null));
      handleChange({
        date_from: null,
        date_to: null,
      });
    }
  };

  const getCurrencyState = () => {
    if (filterState?.symbol) {
      return filterState.symbol;
    }

    if (filterState?.asset) {
      return filterState?.asset;
    }
  };

  return <div className="create-document__step-two__filter container">
    <Select
      options={assetsSelectOptions}
      loading={assetsSelectOptionsLoading}
      onClick={assetsLazyLoad}
      onChange={value => handleChange({ account: value })}
      placeholder={t('naming.exchangesOrWallets')}
      value={filterState?.account ? filterState.account : undefined}
    />
    <div className="create-document__step-two__filter--flex">
      <Select
        loading={assetsExchangeAssetsOptionsLoading}
        options={assetsExchangeAssetsOptions}
        onClick={assetsExchangeSymbolsLazyLoad}
        onChange={value => {
          if (assetsExchangeSymbolsData?.includes(value as string)) {
            handleChange({ symbol: value, asset: null });
          }
          else handleChange({ symbol: null, asset: value });
        }}
        placeholder={t('naming.currency')}
        value={getCurrencyState()}
      />
      <Select
        options={transactionOperationTypes}
        onChange={value => handleChange({ type: value })}
        placeholder={t('naming.operationType')}
        value={filterState?.type ? filterState?.type : undefined}
      />
    </div>
    <Select
      options={reportTransactionTypesOperation}
      onChange={value => handleChange({ report_type: value })}
      placeholder={t('naming.incomeOrExpenses')}
      value={filterState?.report_type ? filterState?.report_type : undefined}
    />
    <RangeDatePicker
      onChange={handleDatePicker}
      placeholder={[t('date.from'), t('date.to')]}
      className="data-picker__transactions"
      value={selectedDate}
    />
    <button className="create-document__step-two__filter__btn" onClick={resetTransactionsFilter}>
      {t('action.clearFilter')}
    </button>
  </div>;
};

export default StepTwoFilter;