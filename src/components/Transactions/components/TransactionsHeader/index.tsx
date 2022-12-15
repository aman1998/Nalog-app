import { useSelector } from "react-redux";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { useScrollDirection } from "hooks/useScrollDirection";
import { EScrollDirection } from "hooks/types";

import { transactionsCountSelector } from "store/transactions/selectors";

import TransactionsFilter from "../TransactionsFilter";

import { formTotalCount } from "./utils";

const TransactionsHeader = (): JSX.Element => {
  const [,scrollDir]  = useScrollDirection();
  const { t } = useTranslation();
  const transactionsTotalCount = useSelector(transactionsCountSelector);
  const total = transactionsTotalCount && formTotalCount(transactionsTotalCount);

  return (
    <>
      <div className="transactions-header">
        <div className="transactions-header__content container">
          <div className="transactions-title__wrapper">
            <h1 className="transactions-title">{t('naming.operations')}</h1>
            <span className="transactions-counter">{total}</span>
          </div>
        </div>
      </div>
      <div className={cn("transactions-header sticky", {
        stickyTop: scrollDir === EScrollDirection.up,
      })}>
        <div className="transactions-header__content container">
          <TransactionsFilter />
        </div>
      </div>
    </>
  );
};

export default TransactionsHeader;
