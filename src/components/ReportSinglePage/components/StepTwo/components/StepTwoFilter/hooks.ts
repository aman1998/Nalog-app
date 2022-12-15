import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TFilterData } from "config/types";

import { ETransactionsCurrency } from "components/Transactions/types";

import {
  assetsCheckListSelector,
  getCreateDocumentAssetsDataSelector,
  getCreateDocumentAssetsFetchingSelector
} from "store/reports/selectors";
import { getCreateDocumentAssetsListRequest } from "store/reports/reducers";
import { TExchangeSymbolsAssetsData } from "store/assets/types";
import {
  getAssetsExchangeAssetsFetchingSelector, getAssetsExchangeSymbolsAssetsSelector,
  getAssetsExchangeSymbolsFetchingSelector
} from "store/assets/selectors";
import { getAssetsExchangeSymbolsRequest } from "store/assets/reducers";

import { filterListHandler } from "utils/filterListHandler";

export type TUseAssetsSelect = () => [TFilterData[], () => void, boolean];

export const useAssetsSelect: TUseAssetsSelect = ()  => {
  const { t } = useTranslation();
  const assetsData = useSelector(getCreateDocumentAssetsDataSelector) || [];
  const loading = useSelector(getCreateDocumentAssetsFetchingSelector);
  const checkedList = useSelector(assetsCheckListSelector);

  const dispatch = useDispatch();

  const assetsLazyLoad = async () => {
    if (!assetsData.length) {
      await dispatch(getCreateDocumentAssetsListRequest([
        { key: "details", value: "transaction_count" },
        { key: "include_manuals", value: "true" },
      ]));}
  };

  const assetsCheckedOptions = useMemo(() => {
    const options = assetsData
      .filter(asset => checkedList.includes(asset.id))
      .map(asset => (
        { value: asset.id, label: asset.name }
      ));
    return filterListHandler(options, t("useAssetsSelect"));
  }, [assetsData, checkedList]);

  return [assetsCheckedOptions, assetsLazyLoad, loading];
};

export const useAssetsExchangeSymbolsSelect: TUseAssetsSelect = () => {
  const { t } = useTranslation();
  const assetsExchangeAssetsFetching = useSelector(getAssetsExchangeSymbolsFetchingSelector);
  const assetsExchangeSymbolsFetching = useSelector(getAssetsExchangeAssetsFetchingSelector);
  const assetsExchangeSymbolsAssetsList = useSelector(getAssetsExchangeSymbolsAssetsSelector);

  const dispatch = useDispatch();

  const assetsExchangeSymbolsLazyLoad = async () => {
    if (!assetsExchangeSymbolsAssetsList?.length) await dispatch(getAssetsExchangeSymbolsRequest());
  };
  
  const loading = assetsExchangeAssetsFetching || assetsExchangeSymbolsFetching;

  const assetsExchangeAssetsOptions = useMemo((): TFilterData[] => {
    if (loading) return [];
    const newData = assetsExchangeSymbolsAssetsList?.map((item: TExchangeSymbolsAssetsData) => {
      const name = item?.exchange_symbol ? item.exchange_symbol : item?.asset;
      return { value: name as string, label: name as string };
    });
    return filterListHandler(newData, t(ETransactionsCurrency.ALL));
  }, [loading, assetsExchangeSymbolsAssetsList]);

  return [assetsExchangeAssetsOptions, assetsExchangeSymbolsLazyLoad, loading];
};