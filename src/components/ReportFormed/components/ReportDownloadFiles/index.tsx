import { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Dictionary } from 'lodash';

import { TChildren } from "config/types";

import Button from "components/Buttons/Button";
import BasketIcon from "components/Icons/BasketIcon";

import {
  deleteSingleTaxReportConfirmedModalSelector,
} from "store/reports/selectors";
import { deleteSingleTaxReportConfirmedModal } from "store/reports/reducers";
import { TDocument } from "store/reports/types";

import DownloadBlock from "./../DownloadBlock";
import { EReportFormedTags, EReportFormedTagsRu } from "./types";

export type ReportDownloadFilesProps = {
  files: Dictionary<TDocument[]>;
  rightSide?: TChildren;
  deleteAll?: boolean;
}

const ReportDownloadFiles: FC<ReportDownloadFilesProps> = ({ files, rightSide, deleteAll }) => {
  const { t } = useTranslation();
  const visible = useSelector(deleteSingleTaxReportConfirmedModalSelector);

  const dispatch = useDispatch();

  const getTagName = (tag: string): string => {
    switch (tag) {
    case EReportFormedTags.common:
      return t(EReportFormedTagsRu.common);
    case EReportFormedTags.expenses:
      return t(EReportFormedTagsRu.expenses);
    case EReportFormedTags.incomes:
      return t(EReportFormedTagsRu.incomes);
    case EReportFormedTags.others:
      return t(EReportFormedTagsRu.others);
    default: return "";
    }
  };

  return <div className="report-formed__content">
    <div className="report-formed__actions" >
      {false && <Button
        className="report-formed__btn"
        title={t("action.downloadAll")}
        disabled={true}
      />}
      {
        Object.keys(files).sort().map((item, idx) => (
          <DownloadBlock
            files={files[item]}
            tag={getTagName(files[item][0].tag || "")}
            key={idx}
          />
        ))
      }
      {deleteAll && <a
        className="report-formed__delete-btn-wrapper"
        onClick={() => dispatch(deleteSingleTaxReportConfirmedModal(!visible))}
      >
        <BasketIcon />
        <p>{t("action.deleteAll")}</p>
      </a>}
    </div>
    {rightSide}
  </div>;
};

export default ReportDownloadFiles;