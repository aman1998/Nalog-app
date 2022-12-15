import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Dictionary } from "lodash";

import { TChildren } from "config/types";

import BNBreadcrumb from "components/BNBreadcrumb";
import { TBreadcrumbItem } from "components/BNBreadcrumb/types";

import { TDocument } from "store/reports/types";

import ReportForming from "./components/ReportForming";
import ReportDownloadFiles from "./components/ReportDownloadFiles";
import DeleteReportFilesModal from "./components/DeleteReportFilesModal";

export type ReportFormedProps = {
  title: string;
  breadcrumbItems: TBreadcrumbItem[];
  files: Dictionary<TDocument[]>;
  loading?: boolean;
  forming?: boolean;
  showDate?: boolean;
  createdAt?: string;
  rightSide?: TChildren;
  deleteAll?: boolean;
};

const ReportFormed: FC<ReportFormedProps> = ({
  title, 
  breadcrumbItems,
  showDate,
  loading,
  forming,
  createdAt ,
  files,
  rightSide,
  deleteAll=true
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='report-formed container'>
        <BNBreadcrumb items={breadcrumbItems} />
        <div className="report-formed__header">
          <h1 className="report-formed__title">{title}</h1>
          {showDate && <p className="report-formed__date">
            {t("naming.formationDate")} {createdAt}
          </p>}
        </div>
        {
          (loading || forming)
            ? <ReportForming text={forming ? t("naming.formationOfDocuments") : undefined} />
            : <ReportDownloadFiles files={files} rightSide={rightSide} deleteAll={deleteAll}/>
        }
      </div>
      {deleteAll && <DeleteReportFilesModal />}
    </>
  );
};

export default ReportFormed;
