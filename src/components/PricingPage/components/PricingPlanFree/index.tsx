import { FC } from 'react';
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { TPricingPlanProps } from 'components/PricingPage/types';

import PricingCard from '../PricingCard';
import PricingCardFeatures from '../PricingCardFeatures';
import PricingProgress from "../PricingProgress";

import PricingPlanFreeDowngradeText from './components/PricingPlanFreeDowngradeText';
import { availableFeatures } from "./constants";

const PricingPlanFree: FC<TPricingPlanProps> = ({ active }) => {
  const { t } = useTranslation();

  return (
    <PricingCard active={active}>
      <div className="pricing__card__title">
        {t("pricing.newbie")}
      </div>
      <div className={cn("pricing__card__pricefree", { "not-active": !active })}>
        {t("pricing.free")}
      </div>
      {active 
        ? <PricingProgress/>
        : <PricingPlanFreeDowngradeText/>}
      <PricingCardFeatures features={availableFeatures}/>
    </PricingCard>
  );
};

export default PricingPlanFree;
