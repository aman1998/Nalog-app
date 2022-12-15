import { FC } from 'react';
import { useTranslation } from "react-i18next";

import TransitionExportSinglePage from 'components/TransitionExportSinglePage';

import { EDocumentCreateOptions } from
  "../ReportsPage/components/DocumentCreateModal/components/DocumentCreateModalForm";

const SourcesExportSinglePage: FC = () => {
  const { t } = useTranslation();
  return <TransitionExportSinglePage title={t("documentCreateModalForm.sourcesExportTitle")}
    type={EDocumentCreateOptions.sourcesExport}/>;
};

export default SourcesExportSinglePage;
