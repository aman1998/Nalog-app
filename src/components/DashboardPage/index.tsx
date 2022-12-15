import { FC } from "react";
import { useMediaQuery } from "react-responsive";

import { mobileMediaWidth } from "config/constants";

import AssetsModal from "../AssetsPageWrapper/components/AssetsModal";

import DashboardPageHeader from "./components/DashboardPageHeader";
import DashboardMobile from "./components/DashboardMobile";
import DashboardDesktop from "./components/DashboardDesktop";
import DashboardDesktopOnboardingWrapper from "./components/DashboardDesktopOnboardingWrapper";
import DashboardSymbols from "./components/DashboardSymbols";

const DashboardPage: FC = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });
  const showDesktopOnboarding = !isMobile && process.env.REACT_APP_ONBOARDING === 'true';

  return (
    <>
      <DashboardSymbols/>
      <div className="container">
        <DashboardPageHeader/>
        <div className="dashboard">
          {isMobile
            ? <DashboardMobile/>
            : <DashboardDesktop/>
          }
        </div>
        {showDesktopOnboarding && <DashboardDesktopOnboardingWrapper/>}
        <AssetsModal />
      </div>
    </>
  );
};

export default DashboardPage;