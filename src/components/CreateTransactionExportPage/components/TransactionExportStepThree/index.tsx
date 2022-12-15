import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

import { QUERIES } from "config/constants";

import List from "components/List";
import BNSpinner from "components/BNSpinner";
import TransactionsListItem from "components/Transactions/components/TransactionsListItem";

import { useScrollEvent } from "hooks/useScrollEvent";
import useQuery from "hooks/useQuery";

import { clearTransactionList, getTransactionsListRequest } from "store/transactions/reducers";
import { PAGINATION_PAGE_LIMIT } from "store/constants";
import { makeSelectTransactionsList, transactionsListSelector } from "store/transactions/selectors";
import { createUploadOperationsSelector } from "store/reports/selectors";

import TransactionExportEmptyList from "../TransactionExportEmptyList";

const TransactionExportStepThree: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const query = useQuery();
  const id = query.get(QUERIES.createSourceId);
  const list = useSelector(makeSelectTransactionsList);
  const {
    fetching, data, finish, next, count
  } = useSelector(transactionsListSelector);

  const createUploadOperations =
    useSelector(createUploadOperationsSelector(id));

  const { types, date_from, date_to } = get(createUploadOperations, ['stepTwo'],
    { types: undefined, date_from: undefined, date_to: undefined });
  const { assetsCheckList } = get(createUploadOperations, ['stepOne'], { assetsCheckList: undefined });

  useEffect(() => {
    dispatch(clearTransactionList());
    dispatch(getTransactionsListRequest({
      accounts: assetsCheckList,
      types,
      date_from,
      date_to,
      limit: PAGINATION_PAGE_LIMIT+1
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useScrollEvent({
    fetching,
    finish,
    fetchList: () => {
      dispatch(
        getTransactionsListRequest({
          accounts: assetsCheckList,
          types,
          date_from,
          date_to,
          offset: next,
          limit: PAGINATION_PAGE_LIMIT+1,
          infiniteScroll: true,
        })
      );
    },
  });

  const getList = () => (
    <Fragment>
      {Object.keys(list).map((transaction, idx) => (
        <Fragment key={`TRANSACTION_ITEM_${idx}`}>
          <div className="transactions-list__title-wrapper">
            <h2 className="transactions-list__title">{transaction}</h2>
          </div>
          <div className="transactions-list__item-wrapper">
            {list[transaction].map(item => (
              <TransactionsListItem key={item.id} transaction={item} isResult={true} />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );

  return (
    <section className={cn("upload-operations__step-three container", { "isEmpty": isEmpty(data) })}>
      {!fetching && !!count && count > 0 && <div className="upload-operations__step-three__sub-title">
        {t("transitionExportStepThree.subTitle", { count: count || 0 })}
      </div>}
      <div className="upload-operations__step-three__transactions">
        <List
          component={getList()}
          loading={fetching && isEmpty(list)}
          preloader={<BNSpinner />}
          emptyText={<TransactionExportEmptyList/>}
          data={data}
        />
      </div>
    </section>
  );
};

export default TransactionExportStepThree;