import { useEffect } from "react";
import MediaQuery  from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth } from "config/constants";

import BNSpinner from "components/BNSpinner";
import List from "components/List";

import {
  getReportsRequest,
  getReportTaxAmountRequest,
} from "store/reports/reducers";
import {
  getReportsDataSelector,
  getReportsFetchingSelector,
} from "store/reports/selectors";
import { TReport } from "store/reports/types";

import ReportCard from "./components/ReportCard";
import CreateReportModal from "./components/CreateReportModal";
import CreateReportMobile from "./components/CreateReportMobile";
import ContinueCreateReportModal from "./components/ContinueCreateReportModal";
import ReportPageHeader from "./components/ReportPageHeader";

const ReportsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const reports = useSelector(getReportsDataSelector)?.results || [];
  const loading = useSelector(getReportsFetchingSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportsRequest());
    dispatch(getReportTaxAmountRequest());
  }, [dispatch]);

  const getReportList = () => (
    <div>
      {
        reports.map((report: TReport) => (
          <ReportCard
            key={report.id}
            id={report.id}
            status={report.status}
            date={report.updated_at || report.created_at}
            name={report.name}
            type={report.type}
          />
        ))
      }
    </div>
  );

  return (
    <>
      <ReportPageHeader/>
      <div className="documents-page__content container">
        <h4 className="documents-page__content__title">{t("documentPage.generatedDocuments")}</h4>
        <div className="report-left-side">
          {
            <List
              component={getReportList()}
              loading={loading}
              preloader={
                <div className="report-preloader">
                  <BNSpinner />
                </div>
              }
              emptyText={
                <div className="no-report">
                  <span> {t("reportsPage.emptyText")} </span>
                </div>
              }
              data={reports}
            />
          }
        </div>
        <MediaQuery minWidth={mobileMediaWidth + 1}>
          <CreateReportModal/>
        </MediaQuery>
        <MediaQuery maxWidth={mobileMediaWidth}>
          <CreateReportMobile/>
        </MediaQuery>
        <ContinueCreateReportModal />
      </div>
    </>
  );
};

export default ReportsPage;
