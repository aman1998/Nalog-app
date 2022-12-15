import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";
import Pagination from "components/Pagination";

import { useScrollEvent } from 'hooks/useScrollEvent';

import {
  makeSelectTransactionsList,
  transactionsListSelector
} from "store/transactions/selectors";
import { getTransactionsListRequest, openAddModal } from "store/transactions/reducers";
import { getFilterTransactionSelector } from "store/filter/selectors";
import { PAGINATION_PAGE_LIMIT } from "store/constants";

import animateScrollTo from "utils/animateScrollTo";
import { onlyDate } from "utils/dateHelpers";

import TransactionsListItem from "../TransactionsListItem";
import TransactionShowMore from "../TransactionShowMore";
import TransactionListSkeleton from "../TransactionListSkeleton";

import { EShowTransactionMode } from "./types";

const TransactionsList: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inifinityLoadCountedRef = useRef<number|null>(null);
  const [showMode, setShowMode] = useState<EShowTransactionMode>(EShowTransactionMode.infinite);
  const [page, setPage] = useState<number>(1);
  const list = useSelector(makeSelectTransactionsList);
  const filters = useSelector(getFilterTransactionSelector);
  const {
    fetching, count, data, finish, next, lastElementFromPreviousPage, firstElementOfNextPage
  } = useSelector(transactionsListSelector);

  const showShowMore = (showMode === EShowTransactionMode.infinite
    || next === PAGINATION_PAGE_LIMIT || page === 1)
    && (next && (count && count > PAGINATION_PAGE_LIMIT));

  const loadNext = ($next: number) => {
    setShowMode(EShowTransactionMode.infinite);

    inifinityLoadCountedRef.current = 1;

    dispatch(getTransactionsListRequest({
      ...filters,
      offset: $next % 10 === 1 ? $next - 1 : $next ,
      limit: PAGINATION_PAGE_LIMIT+1,
      infiniteScroll: true,
    }));
  };

  const loadPage = (newPage: number) => {
    const firstPage = newPage === 1;
    setPage(newPage);
    setShowMode(EShowTransactionMode.page);

    dispatch(getTransactionsListRequest({
      ...filters,
      limit: firstPage ? PAGINATION_PAGE_LIMIT+1 : PAGINATION_PAGE_LIMIT+2,
      offset: firstPage ? ((newPage-1)*PAGINATION_PAGE_LIMIT) : ((newPage-1)*PAGINATION_PAGE_LIMIT)-1,
      callback: () => animateScrollTo(0, 500)
    }));
  };

  useEffect(() => {
    if (data.length > PAGINATION_PAGE_LIMIT) {
      setPage(Math.ceil(data.length/PAGINATION_PAGE_LIMIT));
    }
  }, [data]);

  useScrollEvent({
    fetching,
    finish,
    fetchList: () => {
      if (!(inifinityLoadCountedRef.current && inifinityLoadCountedRef.current <= 4
        && showMode === EShowTransactionMode.infinite)) {
        return;
      }

      inifinityLoadCountedRef.current++;

      dispatch(getTransactionsListRequest({
        ...filters,
        offset: next,
        limit: PAGINATION_PAGE_LIMIT+1,
        infiniteScroll: true,
      }));
    }
  });
  
  if (fetching && showMode === EShowTransactionMode.page) {
    return <TransactionListSkeleton/>;
  }

  return <Fragment>
    {Object.keys(list).map((transaction, index) => (
      <Fragment key={`TRANSACTION_ITEM_${index}`}>
        <div className="transactions-list__title-wrapper">
          {onlyDate(lastElementFromPreviousPage?.datetime) !== onlyDate(list[transaction][0]?.datetime)
            ? <h2 className="transactions-list__title">{transaction}</h2> : <span/>}
          {
            index === 0 &&
            <Button
              title={t('action.addOperations')}
              className="transactions-list__add-btn"
              onClick={() => dispatch(openAddModal())}
            />
          }
        </div>
        <div className="transactions-list__item-wrapper">
          {list[transaction].map(item => (
            <TransactionsListItem
              transaction={item}
              key={item.id}
              isContinuation={
                onlyDate(lastElementFromPreviousPage?.datetime) === onlyDate(list[transaction][0]?.datetime)
              }
              hasContinuation={
                onlyDate(firstElementOfNextPage?.datetime)
                === onlyDate(list[transaction][0]?.datetime)
              }
              hideBorder={true}
            />
          ))}
        </div>
      </Fragment>
    ))}
    {showShowMore && <TransactionShowMore onClick={() => next && loadNext(next)} loading={fetching}/>}
    {count && count > PAGINATION_PAGE_LIMIT && <Pagination
      limit={PAGINATION_PAGE_LIMIT}
      count={count}
      page={page}
      pageClick={loadPage}
    />}
  </Fragment>;
};

export default TransactionsList;