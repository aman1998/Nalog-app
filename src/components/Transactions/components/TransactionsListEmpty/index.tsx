import { FC } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";

import Button from "components/Buttons/Button";

import { openAddModal } from "store/transactions/reducers";

const TransactionsListEmpty: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <section className="transactions-list__empty container">
      <h3 className="transactions-list__empty-title">
        {t("transactionsListEmpty.title")}
      </h3>
      <Button
        className="transactions-list__empty-btn"
        onClick={() => dispatch(openAddModal())}
        title={t('action.addOperations')}
      />
      <p className="transactions-list__empty-text">{t("naming.or")} <NavLink
        to={paths.ASSETS}
        className="transactions-list__empty-link"
      >
        {t("transactionsListEmpty.link")}</NavLink> {t("transactionsListEmpty.text")}</p>
    </section>
  );
};

export default TransactionsListEmpty;
