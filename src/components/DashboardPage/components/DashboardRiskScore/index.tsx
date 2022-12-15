import Progressbar from 'react-js-progressbar';
import { CSSProperties, useState } from "react";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { colors, maxMobileMediaWidth } from "config/constants";

import HeartIcon from 'components/Icons/HeartIcon';
import AssetNoteIcon from "components/Icons/AssetNoteIcon";
import BNTooltip from "components/BNTooltip";

import { isSafari } from "../../../../utils/browser";

import { getPathColor, getProgressStatus } from "./utils";
import DashboardRiskScoreSoonLabel from "./components/DashboardRiskScoreSoonLabel";

const DashboardRiskScore = (): JSX.Element => {
  const { t } = useTranslation();
  const soon = process.env.REACT_APP_DASHBOARD_RISK_SCORE !== "true";
  const [percentage,] = useState(() => soon ? 66 : 47);
  const { status, statusText, stroke, fill } = getProgressStatus(percentage);
  const pathColor = getPathColor(status);
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)`, });
  const heartStyles: CSSProperties = {};

  if (isSafari) {
    heartStyles.top = 27;
    heartStyles.right = 111;
  }

  return (
    <div className="dashboard-risk-score__wrapper">
      <div className="dashboard-risk-score">
        <div className={cn("dashboard-risk-score__header", { center: soon && isMobile })}>
          <div className="dashboard-risk-score__header__title">
            {t("dashboardRiskScore.title")}
          </div>
          {!isMobile && <BNTooltip title={t("dashboardRiskScore.tooltip")}>
            <span>
              <AssetNoteIcon />
            </span>
          </BNTooltip>}
        </div>
        <div className="dashboard-risk-score__progress">
          <Progressbar
            input={percentage}
            pathWidth={isMobile ? 24 : 16}
            trailWidth={isMobile ? 24 : 16}
            pathColor={pathColor}
            trailColor={colors.gray4}
            backgroundColor={"#fff"}
            textStyle={{ fill: colors.gray8, fontSize: isMobile ? 40 : 20, fontWeight: 600 }}
            shape={isMobile ? "full circle" : "arc"}
            pathLinecap={"round"}
            clockwise={isSafari}
          >
            {!isMobile && <div
              style={heartStyles}
              className={cn("dashboard-risk-score__progress__heart", { status })}
            >
              <HeartIcon fill={fill} stroke={stroke}/>
            </div>}
          </Progressbar>
        </div>
        {!soon && <div className="dashboard-risk-score__footer" dangerouslySetInnerHTML={{ __html: statusText }}/>}
        {soon && <DashboardRiskScoreSoonLabel />}
      </div>
      {isMobile && <div className="dashboard-risk-score__progress__border"/>}
    </div>
  );
};

export default DashboardRiskScore;
