import { FC } from 'react';
import cn from "classnames";
import { useTranslation } from "react-i18next";

import ExternalLinkIcon from "components/Icons/ExternalLinkIcon";

import { ETariffPlan } from 'store/services/types';

import PricingCardActiveMarker from './components/PricingCardActiveMarker';
import PricingCardPopular from './components/PricingCardPopular';

export type TPricingCardProps = {
  pricing?: ETariffPlan
  active?: boolean
  popular?: boolean
}

const PricingCard: FC<TPricingCardProps> = ({ children, pricing, active, popular }) => {
  const { t } = useTranslation();

  return (
    <div className="pricing__card__wrapper">
      <div className={cn("pricing__card", pricing )}>
        {children}
        {active && <PricingCardActiveMarker/>}
        {(popular && !active) && <PricingCardPopular/>}
      </div>
      <a
        href="https://bitok.org/pricing"
        target="_blank"
        className="pricing__card__external-link"
        rel="noopener noreferrer"
      >
        {t("pricing.learnMore")}
        <ExternalLinkIcon/>
      </a>
    </div>
  );};

export default PricingCard;