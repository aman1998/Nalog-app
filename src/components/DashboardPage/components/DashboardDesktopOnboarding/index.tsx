import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import JoyrideTooltip from "components/JoyrideTooltip";

import {
  dashboardOnboardingFinish,
  setDashboardOnboardingAssetsShowAll,
  setDashboardOnboardingRun
} from "store/common/reducers";
import { dashboardOnboardingSelector } from "store/common/selectors";
import { showModal as showModalAction } from "store/assets/reducers";

import { spotlightBorder } from "./utils";

const DashboardDesktopOnboarding = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [stepIndex, setStepIndex] = useState(0);
  const { isRun, howToUse } = useSelector(dashboardOnboardingSelector);

  const steps: Step[] = [
    {
      disableBeacon: true,
      target: '.dashboard-your-accounts',
      content: t("dashboardOnboarding.yourAccountsContent"),
      title: t('dashboardYourAccounts.title'),
      placement: 'bottom',
      styles: spotlightBorder(50)
    },
    {
      target: '.dashboard-assets',
      title: t('naming.yourCryptoAssets'),
      content: t("dashboardOnboarding.assetsContent"),
      placement: 'left',
      styles: spotlightBorder(8)
    },
    {
      target: '.dashboard-diagram',
      content: t("dashboardOnboarding.diagramContent"),
      title: t('naming.assetsDistribution'),
      placement: 'right',
      styles: spotlightBorder(8)
    },
    {
      target: '.dashboard-assets-value',
      content: t("dashboardOnboarding.assetsValueContent"),
      title: t('naming.assetsValue'),
      placement: 'right',
      styles: spotlightBorder(8)
    },
    {
      target: '.dashboard-p2p-exchange',
      content: t("dashboardOnboarding.p2pExchangeContent"),
      title: t('naming.p2pExchange'),
      placement: 'right',
      styles: spotlightBorder(8)
    },
    {
      target: '.dashboard-taxes',
      title: t('naming.yourTaxes'),
      content: t("dashboardOnboarding.taxesContent"),
      placement: 'right',
      styles: spotlightBorder(50)
    },
  ];

  const callback = (data: CallBackProps) => {
    const { action, index, status, type } = data;
    if (action === ACTIONS.CLOSE) {
      setStepIndex(0);
      dispatch(setDashboardOnboardingRun(false));
      return;
    } else if ([
      EVENTS.STEP_AFTER as string,
      EVENTS.TARGET_NOT_FOUND as string].includes(type)) {

      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      return;
    } else if ([STATUS.FINISHED as string, STATUS.SKIPPED as string].includes(status)) {
      setStepIndex(0);

      dispatch(dashboardOnboardingFinish());

      if (!howToUse) {
        dispatch(showModalAction(true));
        dispatch(setDashboardOnboardingAssetsShowAll());
      }
      return;
    }
  };

  return <Joyride
    spotlightPadding={0}
    scrollOffset={200}
    steps={steps}
    stepIndex={stepIndex}
    scrollToFirstStep={true}
    continuous={true}
    disableOverlayClose={true}
    run={isRun}
    tooltipComponent={JoyrideTooltip}
    callback={callback}
  />;
};

export default DashboardDesktopOnboarding;