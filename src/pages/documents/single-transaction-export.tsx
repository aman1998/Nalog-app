import { FC } from "react";
import { useTranslation } from "react-i18next";

import TransitionExportSinglePage from "components/TransitionExportSinglePage";

const SingleTransitionExportPage: FC = () => {
  const { t } = useTranslation();
  return <TransitionExportSinglePage title={t("documentCreateModalForm.transactionsExportTitle")}/>;
};

export default SingleTransitionExportPage;
