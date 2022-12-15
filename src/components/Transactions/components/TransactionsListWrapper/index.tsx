import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import isEmpty from "lodash/isEmpty";
import cn from "classnames";

import { mobileMediaWidth } from "config/constants";

import List from "components/List";

import useQuery from "hooks/useQuery";

import {
  makeSelectTransactionsList,
  transactionsListFetchingSelector,
  transactionsListDataSelector
} from "store/transactions/selectors";
import { IGetTransactionsListRequest, TTransactionResult } from "store/transactions/types";
import { getFilterTransactionSelector } from "store/filter/selectors";
import { getTransactionsListRequest, clearTransactionsState } from "store/transactions/reducers";
import { clearFilterState, setFilterTransactions } from "store/filter/reducers";
import { ETransactionsFilterKeys } from "store/filter/types";
import { getMyAssetsDataSelector } from "store/assets/selectors";
import { PAGINATION_PAGE_LIMIT } from "store/constants";

import TransactionEditConfirm from "../TransactionEditConfirm";
import TransactionsListEmpty from "../TransactionsListEmpty";
import TransactionEditModal from "../TransactionsEditModal";
import TransactionsList from "../TransactionsList";
import TransactionListSkeleton from "../TransactionListSkeleton";
import TransactionIncomingOperationModal from "../TransactionIncomingOperationModal";
import TransactionEditNoteModal from "../TransactionsListItem/components/TransactionEditNoteModal";
import TransactionEditTagModal from "../TransactionsListItem/components/TransactionEditTagModal";

import TransactionAddModal from "./../TransactionAddModal";

const TransactionsListWrapper = (): JSX.Element => {
  const isTablet = useMediaQuery({ query: "(max-width: 1199.98px)" });
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileMediaWidth}px)` });
  const dataAssets = useSelector(getMyAssetsDataSelector);
  const fetching = useSelector(transactionsListFetchingSelector);
  const list = useSelector(makeSelectTransactionsList);
  const data = useSelector(transactionsListDataSelector);
  const filters = useSelector(getFilterTransactionSelector);
  const query = useQuery();

  const dispatch = useDispatch();

  useEffect(() =>
    () => {
      dispatch(clearFilterState());
      dispatch(clearTransactionsState());
    }
  , [dispatch]);

  const fetchTransactions = (props: IGetTransactionsListRequest): void => {
    dispatch(getTransactionsListRequest(props)); //
  };

  useEffect(
    () => {
      const queryParamsNotInitiated = (!filters.account && query.get(ETransactionsFilterKeys.account));

      if(!isMobile && !queryParamsNotInitiated) {
        dispatch(clearTransactionsState());
        fetchTransactions({
          ...filters,
          infiniteScroll: true,
          limit: PAGINATION_PAGE_LIMIT+1,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

  useEffect(() => {
    const account = query.get(ETransactionsFilterKeys.account);

    if (account && dataAssets?.length) {
      dispatch(setFilterTransactions({ ...filters, account }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAssets]);

  useEffect(
    () => {
      if(isMobile) {
        dispatch(clearTransactionsState());
        fetchTransactions({
          ...filters,
          infiniteScroll: true
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <section className={cn("transactions-list", { "container": !isTablet })}>
      <List<TTransactionResult>
        component={<TransactionsList />}
        loading={fetching && isEmpty(list)}
        preloader={<TransactionListSkeleton />}
        emptyText={<TransactionsListEmpty />}
        data={data}
      />
      <TransactionEditModal />
      <TransactionEditConfirm getListCallback={() => dispatch(getTransactionsListRequest(filters))} />
      <TransactionAddModal />
      <TransactionIncomingOperationModal />
      <TransactionEditNoteModal />
      <TransactionEditTagModal />
    </section>
  );
};

export default TransactionsListWrapper;
