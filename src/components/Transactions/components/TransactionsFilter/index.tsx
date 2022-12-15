import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RangeValue } from "rc-picker/lib/interface";
import moment, { Moment } from "moment";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth, transactionOperationTypes } from "config/constants";
import { TFilterData } from "config/types";

import Select from "components/Select";
import RangeDatePicker from "components/RangeDatePicker";

import { getAssetsExchangeSymbolsRequest, getMyAssetsRequest } from "store/assets/reducers";
import {
  getAssetsExchangeAssetsFetchingSelector,
  getAssetsExchangeSymbolsAssetsSelector,
  getAssetsExchangeSymbolsDataSelector,
  getAssetsExchangeSymbolsFetchingSelector,
  getMyAssetsDataSelector,
  getMyAssetsFetchingSelector
} from "store/assets/selectors";
import { getFilterTransactionSelector, getSelectedDatesSelector } from "store/filter/selectors";
import { setFilterTransactions, setFilterTransactionsDefault, setSelectedDates } from "store/filter/reducers";
import { TExchangeSymbolsAssetsData, TMyAssetsData } from "store/assets/types";

import { filterListHandler } from "utils/filterListHandler";
import animateScrollTo from "utils/animateScrollTo";

import { ETransactionsCurrency } from "../../types";

const TransactionsFilter: FC = () => {
  const { t } = useTranslation();
  const dataAssets = useSelector(getMyAssetsDataSelector);
  const assetsExchangeSymbolsAssetsList = useSelector(getAssetsExchangeSymbolsAssetsSelector);
  const assetsExchangeSymbolsFetching = useSelector(getAssetsExchangeAssetsFetchingSelector);
  const assetsExchangeSymbolsData = useSelector(getAssetsExchangeSymbolsDataSelector);
  const assetsExchangeAssetsFetching = useSelector(getAssetsExchangeSymbolsFetchingSelector);
  const loading = useSelector(getMyAssetsFetchingSelector);
  const filterState = useSelector(getFilterTransactionSelector);
  const selectedDate = useSelector(getSelectedDatesSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  const dispatch = useDispatch();

  const handleChange = (value: Record<string, unknown>): void => {
    dispatch(setFilterTransactions({ ...filterState, ...value }));
    if (!isMobile) {
      animateScrollTo(0, 500);
    }
  };

  const resetTransactionsFilter = () => {
    dispatch(setSelectedDates(null));
    dispatch(setFilterTransactionsDefault());
  };

  const filterAssets = (): TFilterData[] => {
    const newData = dataAssets?.map((item: TMyAssetsData) => ({ value: item.id, label: item.name }));
    return filterListHandler(newData, t('naming.allExchangesAndWallets'));
  };

  const filterCurrency = (): TFilterData[] => {
    const newData = assetsExchangeSymbolsAssetsList?.map((item: TExchangeSymbolsAssetsData) => {
      const name = item?.exchange_symbol ? item.exchange_symbol : item?.asset;
      return { value: name as string, label: name as string };
    });
    return filterListHandler(newData, t(ETransactionsCurrency.ALL));
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

  const accountState = filterState?.account ? filterState.account : undefined;
  const typeState = filterState?.type ? filterState?.type : undefined;

  useEffect(() => {
    dispatch(getMyAssetsRequest({ include_subaccounts: true }));
    dispatch(getAssetsExchangeSymbolsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="transactions-filter">
      <Select
        options={filterAssets()}
        loading={loading}
        onChange={value => handleChange({ account: value })}
        placeholder={t('naming.exchangesOrWallets')}
        className="select-assets"
        value={accountState}
      />
      <div className="transactions-filter--flex">
        <Select
          loading={assetsExchangeSymbolsFetching || assetsExchangeAssetsFetching}
          options={(!assetsExchangeSymbolsFetching && !assetsExchangeAssetsFetching) ? filterCurrency() : []}
          onChange={value => {
            if (assetsExchangeSymbolsData?.includes(value as string)) {
              handleChange({ symbol: value, asset: null });
            }
            else handleChange({ symbol: null, asset: value });
          }}
          placeholder={t('naming.currency')}
          className="select-currency"
          value={getCurrencyState()}
        />
        <Select
          options={transactionOperationTypes}
          onChange={value => handleChange({ type: value })}
          placeholder={t('naming.operationType')}
          className="select-type"
          value={typeState}
        />
      </div>
      <RangeDatePicker
        onChange={handleDatePicker}
        placeholder={[t('date.from'), t('date.to')]}
        className="data-picker__transactions"
        value={selectedDate}
      />
      <button className="transactions-filter__btn" onClick={resetTransactionsFilter}>
        {t('action.clearAllFilter')}
      </button>
    </div>
  );
};

export default TransactionsFilter;
