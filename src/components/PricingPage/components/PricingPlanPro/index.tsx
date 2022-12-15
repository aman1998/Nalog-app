import { FC } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { QUERIES } from "config/constants";

import Button from "components/Buttons/Button";

import { EModals } from "store/modals/types";
import { ETariffPlan, EServiceCode } from 'store/services/types';
import { servicesAllSelectByCodeSelector } from "store/services/selectors";

import { EPlans, usePlanContext } from "../../index";
import { TPricingPlanProps } from "../../types";

import PricingCard from "../PricingCard";
import PricingCardFeatures from "../PricingCardFeatures";
import PricingProgress from "../PricingProgress";
import PricingCardPrice from "../PricingCardPrice";

import { availableFeatures } from "./constants";

const PricingPlanPro: FC<TPricingPlanProps> = ({ active }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { plan } = usePlanContext();
  const proMonth = useSelector(servicesAllSelectByCodeSelector(EServiceCode.plansProMonth));
  const proYear = useSelector(servicesAllSelectByCodeSelector(EServiceCode.plansProYear));
  const pro = plan === EPlans.monthly ? proMonth : proYear;

  const openPricingActivateModal = () => {
    history.replace({
      search: `?${QUERIES.modal}=${EModals.activatePricing}&${QUERIES.pricing}=${ETariffPlan.pro}`
    });
  };
  
  return (
    <PricingCard pricing={ETariffPlan.pro} active={active}>
      <div className="pricing__card__title">
        {t("pricing.pro")}
      </div>
      <PricingCardPrice active={active} currency={pro?.currency} price={pro?.price}/>
      {active
        ? <PricingProgress pricing={ETariffPlan.pro}/>
        : (
          <Button 
            title={t("pricing.getPro")}
            className="pricing__card__btn" 
            pink={true}
            onClick={openPricingActivateModal}
          />)
      }
      <PricingCardFeatures features={availableFeatures}/>
    </PricingCard>
  );};

export default PricingPlanPro;