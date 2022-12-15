import { FC } from 'react';
import { useTranslation } from "react-i18next";

const TransactionExportEmptyList: FC = () => {
  const { t } = useTranslation();
  return <div className="upload-operations__step-three__empty-list">{t("transitionExportStepThree.emptyList")}</div>;
};

export default TransactionExportEmptyList;