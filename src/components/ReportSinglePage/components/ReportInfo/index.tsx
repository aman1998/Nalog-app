import { FC, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getReportOperationsPath } from "config/paths";
import { colors } from "config/constants";

import RemainingDays from "components/RemainingDays";
import AssetNoteIcon from "components/Icons/AssetNoteIcon";
import VectorArrowIcon from "components/Icons/VectorArrowIcon";
import BNTooltip from "components/BNTooltip";

import { getReportFormedDataSelector } from "store/reports/selectors";

import { formatRubs } from "utils/fractions";

import { getCalculations } from "./utils";

const ReportInfo: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getReportFormedDataSelector);
  const calculations = getCalculations(data);
  const history = useHistory();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    history.push(getReportOperationsPath(id));
  };

  return (
    <div className="report-calculations">
      <div className="report-calculations__texts">
        <a onClick={handleClick} className="report-calculations__operations">
          <span className="report-calculations__link"  
            dangerouslySetInnerHTML={{ __html: t("reportInfo.text1", { year: 2021 }) }}/>
          <VectorArrowIcon fill={colors.main} />
        </a>
        <p className="report-calculations__text"
          dangerouslySetInnerHTML={{ __html: t("reportInfo.text2") }}/>
        <p className="report-calculations__text report-calculations__text--second">
          {t("reportInfo.text3")}
        </p>
      </div>

      <div className="report-calculations__title">
        <div>{t("reportInfo.title")}:</div>
        <RemainingDays date="2022-05-04" className="report-calculations__remaining-day" widthDaysText={false} />
      </div>
      <div className="report-calculations__item-wrapper">
        {calculations.map(item => (
          <div key={item.title} className={`report-calculations__item report-calculations__item--${item.type}`}>
            <div className="report-calculations__item-header">
              <div className="report-calculations__item-header-title">{item.title}</div>
              <BNTooltip title={item.tooltip}>
                <span>
                  <AssetNoteIcon />
                </span>
              </BNTooltip>
            </div>
            <div className={`report-calculations__item-count report-calculations__item-count--${item.type}`}>
              {formatRubs(item.count)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportInfo;
