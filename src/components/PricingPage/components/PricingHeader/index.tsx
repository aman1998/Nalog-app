import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { maxTableMediaWidth } from "config/constants";

import PricingSwitch from "../PricingSwitch";

const PricingHeader: FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxTableMediaWidth}px)`,
  });
  
  return (
    <div className="pricing__header container">
      {!isMobile && <div className="pricing__header__title">
        {t("naming.pricing")}
      </div>}
      <PricingSwitch/>
    </div>
  );};

export default PricingHeader;