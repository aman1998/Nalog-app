import { FC } from 'react';
import cn from 'classnames';

import { EStatus } from "config/types";

import DownloadIcon from "components/Icons/DownloadIcon";
import PdfIcon from "components/Icons/DocTypesIcons/PdfIcon";

import { TDocument } from "store/reports/types";

import { onClickDownloadFile } from "utils/saveFiles";

const ReportSingleElement:FC<TDocument> = ({
  name,
  file,
  status
}) => (
  <div className="old-report-card-single-element">
    <div className={cn("old-report-card-title", { "old-report-card__disabled": status===EStatus.forming })}>
      <PdfIcon/>
      <p>{name}</p>
    </div>
    {(status === EStatus.formed && file) &&
      <div onClick={()=>onClickDownloadFile(file)} className="old-report-card-download">
        <DownloadIcon/>
      </div>
    }
  </div>
);

export default ReportSingleElement;
