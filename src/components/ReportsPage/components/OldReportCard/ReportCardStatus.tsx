import { FC } from 'react';

import { EStatus } from "config/types";

import ShowMoreIcon from "components/Icons/ShowMoreIcon";
import LoadingIcon from "components/Icons/LoadingIcon";
import ErrorIcon from "components/Icons/ErrorIcon";


interface IReportCardStatusProps{
  status: EStatus;
}

const ReportCardStatus:FC<IReportCardStatusProps> = ({ status }) => {
  switch (status){
  case EStatus.forming:
    return <LoadingIcon className="report-loading"/>;
  case EStatus.formed:
    return <ShowMoreIcon/>;
  case EStatus.error:
    return <ErrorIcon className="report-error"/>;
  default:
    return null;
  }
};

export default ReportCardStatus;
