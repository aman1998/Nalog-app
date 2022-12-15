import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  getReportsTaxAmountFetchingSelector,
  getReportsTaxAmountFailureSelector,
  getReportsTaxAmountDataOF2021Selector
} from "store/reports/selectors";

import { formatRubs } from "utils/fractions";


const TaxAmount: FC<{className: string, isMobile?: boolean}> = ({ className, isMobile = false }) => {
  const { t } = useTranslation();
  const reportsTaxAmount = useSelector(getReportsTaxAmountDataOF2021Selector);
  const loading = useSelector(getReportsTaxAmountFetchingSelector);
  const failure = useSelector(getReportsTaxAmountFailureSelector);

  const year = new Date().getFullYear();

  return (
    <div className={`${className}__payment`}>
      <div className={`${className}__payment-text`}>
        {
          isMobile 
            ? <div dangerouslySetInnerHTML={
              { __html: t("taxAmount.taxForMobile", { year: reportsTaxAmount?.year || year }) }}/>
            : <div dangerouslySetInnerHTML={
              { __html: t("taxAmount.taxFor", { year: reportsTaxAmount?.year || year }) }}/>
        }
      </div>
      <div className={`${className}__payment-sum`}>
        {
          loading ? <span style={{ opacity: 0 }}>...</span> :
            failure ?
              <span>{formatRubs(0)}</span> :
              <Fragment><span>{formatRubs(Number(reportsTaxAmount?.amount) || 0)}</span></Fragment>
        }
      </div>
    </div>
  );
};

export default TaxAmount;
