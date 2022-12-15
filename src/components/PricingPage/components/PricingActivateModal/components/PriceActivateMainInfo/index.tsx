import { FC } from "react";
import { useTranslation } from "react-i18next";

import { QUERIES } from "config/constants";

import useQuery from "hooks/useQuery";

import { ETariffPlan } from 'store/services/types';

import { EPlans, usePlanContext } from "../../../../index";

const PriceActivateMainInfo: FC = ( ) => {
  const { t } = useTranslation();
  const { plan } = usePlanContext();
  const query = useQuery();
  const pricing = query.get(QUERIES.pricing) as ETariffPlan;

  const formPricing = () => {
    switch (pricing) {
    case ETariffPlan.smart:
      return t("pricing.smart");
    case ETariffPlan.pro:
      return t("pricing.pro");
    }
  };

  const formPlan = () => {
    switch (plan) {
    case EPlans.monthly:
      return t("pricing.monthlySubsctiption");
    case EPlans.annually:
      return t("pricing.annuallySubsctiption");
    }
  };

  const formPrice = () => {
    switch (plan) {
    case EPlans.monthly:
      return <><span>{"990"}</span>{"₽ / " + t("pricing.month")}</>;
    case EPlans.annually:
      return <><span>{"1 990"}</span>{"₽ / " + t("pricing.month")}</>;
    }
  };

  return (
    <>
      <div className="pricing__activate__main-info">
        <div className="pricing__activate__main-info__content">
          <div className="pricing__activate__main-info__prising">
            { formPricing() }
          </div>
          <div className="pricing__activate__main-info__plan">
            { formPlan() }
          </div>
        </div>
        <div className="pricing__activate__main-info__price">
          { formPrice() }
        </div>
      </div>
    </>
  );
};

export default PriceActivateMainInfo;