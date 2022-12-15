import { FC, Fragment } from "react";
import get from "lodash/get";
import { useSelector } from "react-redux";

import TransactionsListItem from "components/Transactions/components/TransactionsListItem";

import { reportTransactionsSelector } from "store/reports/selectors";

import TransactionItemCheckbox from "./componets/TransactionItemCheckbox";

const ReportTransactions: FC = () => {
  const list = useSelector(reportTransactionsSelector);

  return (
    <Fragment>
      {Object.keys(list).map((transaction, idx) => (
        <Fragment key={`TRANSACTION_ITEM_${idx}`}>
          <div className="transactions-list__title-wrapper">
            <h2 className="transactions-list__title">{transaction}</h2>
          </div>
          <div className="transactions-list__item-wrapper">
            {list[transaction].map(item => (
              <TransactionsListItem
                transaction={item}
                getCheckbox={
                  <TransactionItemCheckbox
                    checked={get(item, "checked")}
                    transactionId={item.tax_report_transaction_id}
                  />
                }
                key={item.id}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ReportTransactions;
