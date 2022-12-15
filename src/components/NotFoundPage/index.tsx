import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";

import NotFoundIcon from "components/Icons/notFound";

const NotFoundPage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <section className="page-not-found">
      <NotFoundIcon />
      <span>
        <h5>{t("notFoundPage.title")}</h5>
      </span>
      <NavLink className="page-link" to={paths.HOME} exact={true}>
        {t("notFoundPage.comeToMainPage")}
      </NavLink>
    </section>
  );};

export default NotFoundPage;
