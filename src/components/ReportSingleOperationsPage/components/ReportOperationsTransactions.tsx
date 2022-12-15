import { FC, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { minLaptopMediaWidth } from "config/constants";

import TransactionsListItem from "components/Transactions/components/TransactionsListItem";
import BNSpinner from "components/BNSpinner";
import List from "components/List";

import { useScrollEvent } from "hooks/useScrollEvent";

import { reportTransactionsRequest } from "store/reports/reducers";
import {
  reportTransactionsDataSelector,
  reportTransactionsFetchingSelector,
  reportTransactionsFinishSelector,
  reportTransactionsNextPageSelector,
  reportTransactionsSelector,
  reportTransactionsTypeSelector,
} from "store/reports/selectors";

const ReportOperationsTransactions: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isTablet = useMediaQuery({ query:  `(max-width: ${minLaptopMediaWidth}px)` });

  const list = useSelector(reportTransactionsSelector);
  const data = useSelector(reportTransactionsDataSelector);
  const fetching = useSelector(reportTransactionsFetchingSelector);
  const finish = useSelector(reportTransactionsFinishSelector);
  const type = useSelector(reportTransactionsTypeSelector);
  const next = useSelector(reportTransactionsNextPageSelector);

  useEffect(() => {
    dispatch(reportTransactionsRequest({ id, type, isResult: true }));
    
  }, [dispatch, type]);

  useScrollEvent({
    fetching,
    finish,
    fetchList: () => {
      dispatch(
        reportTransactionsRequest({
          id,
          type,
          page: next || 1,
          isResult: true
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
              <TransactionsListItem transaction={item} key={item.id} isResult={true} />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );

  return (
    <section className={`transactions-list ${!isTablet && "container"}`}>
      <List
        component={getList()}
        loading={fetching && isEmpty(list)}
        preloader={<BNSpinner />}
        emptyText={<span>{t("naming.emptyList")}</span>}
        data={data}
      />
    </section>
  );
};

export default ReportOperationsTransactions;
