import { FC } from 'react';
import { useTranslation } from "react-i18next";

import { ECurrency } from "config/types";

import { EPlans, usePlanContext } from "../../index";

export type TPricingCardPriceProps = {
  active?: boolean;
  currency?: ECurrency;
  price?: number;
}
const PricingCardPrice: FC<TPricingCardPriceProps> = ({ active, currency, price }) => {
  const { t } = useTranslation();
  const { plan } = usePlanContext();

  const formTime = () => {
    if (plan === EPlans.annually) {
      return t("pricing.year");
    }
    return t("pricing.month");
  };

  return <>
    {!active && <div className="pricing__card__price">
      {
        currency === ECurrency.rub
          ? <div>{price}<span className="time">₽ / {formTime()}</span></div>
          : <div><span className="usd">$</span>{price}<span className="time">/ {formTime()}</span></div>
      }
    </div>}
  </>;
};

export default PricingCardPrice;