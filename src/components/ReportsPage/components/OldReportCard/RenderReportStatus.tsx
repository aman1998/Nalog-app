import { FC } from 'react';
import { useTranslation } from "react-i18next";

import { EStatus } from "config/types";

export interface IRenderReportStatus{
  status: EStatus,
  name: string;
}

export const RenderReportStatus:FC<IRenderReportStatus> = ({ status, name }) =>{
  const { t } = useTranslation();
  
  if(status===EStatus.formed){
    return <h4>{name}</h4>;
  }
  if(status===EStatus.error){
    return <h4 className="report-error">{t("naming.error")}</h4>;
  }
  if (status===EStatus.forming){
    return <h4 className="report-forming">{t("renderReportStatus.reportForming")}</h4>;
  }
  return null;
};
