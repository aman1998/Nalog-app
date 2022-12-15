import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";

import { maxMobileMediaWidth } from "config/constants";

import { startDashboardOnboarding, startDashboardOnboardingHowToUse } from "store/common/reducers";
import { dashboardOnboardingSelector } from "store/common/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import DashboardDesktopOnboarding from "../DashboardDesktopOnboarding";
import DashboardDesktopWelcomeModal from "../DashboardDesktopWelcomeModal";

const DashboardDesktopOnboardingWrapper = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isRun, howToUse } = useSelector(dashboardOnboardingSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  
  return (
    <>
      <DashboardDesktopOnboarding/>
      <DashboardDesktopWelcomeModal
        title={t("dashboardDesktopWelcomeModal.title")}
        text={t("dashboardDesktopWelcomeModal.text")}
        onSubmit={() => dispatch(startDashboardOnboarding())}
      />

      {!isMobile && <button
        className={cn("dashboard-onboarding-btn", { show: howToUse })}
        onClick={() => {
          dispatch(analyticEvent(EEventType.DASHBOARD_SHOW_TUTORIAL));
          dispatch(startDashboardOnboardingHowToUse());
        }}
        disabled={isRun}
      >
        <span>?</span>{t("dashboardDesktopOnboardingWrapper.howToUse")}
      </button>}
    </>
  );
};

export default DashboardDesktopOnboardingWrapper;
