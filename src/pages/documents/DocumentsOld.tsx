import { FC } from "react";
import { useSelector } from "react-redux";

import ReportCard from "components/ReportsPage/components/OldReportCard";

import { getReportsDataSelector } from "store/reports/selectors";
import { TReport } from "store/reports/types";

const DocumentsOld: FC = () => {
  const reports = useSelector(getReportsDataSelector)?.results;
  return (
    <div className="container">
      {
        reports?.filter(item => item.documents.length).map((report: TReport) => (
          <ReportCard
            key={report.id}
            documents={report.documents}
            id={report.id}
            status={report.status}
            user={report.user}
            created_at={report.created_at}
            name={report.name}
            type={report.type}
          />
        ))
      }
    </div>
  );
};

export default DocumentsOld;
