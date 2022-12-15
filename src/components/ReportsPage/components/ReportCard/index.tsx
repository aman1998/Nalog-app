import { FC } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { getDocumentSourcesExportPage, getDocumentTransactionExportPage, getReportSinglePath } from "config/paths";

import ArrowIcon from "components/Icons/ArrowIcon";

import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";
import { EReportStatus, EReportType } from "store/reports/types";

import { TReportCardProps } from "./types";

const ReportCard: FC<TReportCardProps> = (
  {
    date,
    id,
    status,
    name,
    type
  }
) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const getStatus = (value: string): JSX.Element => {
    switch (value) {
    case EReportStatus.draft:
      return <p className="report-card__date report-card__status--draft">({t("naming.notFinished")})</p>;
    case EReportStatus.error:
      return <p className="report-card__date report-card__status--error">({t("naming.error")})</p>;
    default:
      return <p className="report-card__status--empty"/>;
    }
  };

  let docName = name;

  switch (type) {
  case EReportType.transaction_export:
    docName = t("documentCreateModalForm.transactionsExportTitle");
    break;

  case EReportType.sources_export:
    docName = t("documentCreateModalForm.sourcesExportTitle");
    break;
  }

  const handleClick = () => {

    switch (type) {
    case EReportType.tax_report:
      history.push(getReportSinglePath(id));
      dispatch(analyticEvent(EEventType.DOCS_TAXREPORT_DRAFT_OPEN));
      break;

    case EReportType.transaction_export:
      history.push(getDocumentTransactionExportPage(id));
      docName = t("documentCreateModalForm.transactionsExportTitle");
      break;

    case EReportType.sources_export:
      history.push(getDocumentSourcesExportPage(id));
      docName = t("documentCreateModalForm.sourcesExportTitle");
      break;
    }
  };

  return (
    <a onClick={handleClick} className="report-card">
      <div className="report-card__content">
        <p className="report-card__date">
          {t("naming.formationDate")}: {moment(date).locale(i18n.language).format("DD.MM.YYYY")}
        </p>
        <p className="report-card__title">{docName}</p>
        {getStatus(status)}
      </div>
      <div className="report-card__arrow-wrapper">
        <ArrowIcon/>
      </div>
    </a>
  );
};

export default ReportCard;
