import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import BNBreadcrumb from "components/BNBreadcrumb";
import ReportResultTransactionTypesTab from "components/ReportResultTransactionTypesTab";

import { getSingleTaxReportRequest } from "store/reports/reducers";
import { getSingleTaxReportDataSelector } from "store/reports/selectors";

import { getBreadcrumbItems } from "../utils";

const ReportOperationsHeader: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const report = useSelector(getSingleTaxReportDataSelector(id));
  const dispatch = useDispatch();
  const items = getBreadcrumbItems(id);

  useEffect(() => {
    if (!report) {
      dispatch(getSingleTaxReportRequest({ id }));
    }
  }, [dispatch, report]);

  return (
    <div className="report-operations__header">
      <div className="container">
        <BNBreadcrumb items={items} />
        <h1 className="report-operations__header_title">{t("naming.declarationFor", { year: 2021 })}</h1>
        <ReportResultTransactionTypesTab />
      </div>
    </div>
  );
};

export default ReportOperationsHeader;
