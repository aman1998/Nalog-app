import { FC } from "react";

import DefaultSpinner from "components/BNSpinner";

const ReportForming: FC<{ text?: string }> = ({ text }) => (
  <div className="report-formed__loading">
    <DefaultSpinner />
    {text && <p className="report-formed__loading-text">{text}</p>}
  </div>
);

export default ReportForming;
