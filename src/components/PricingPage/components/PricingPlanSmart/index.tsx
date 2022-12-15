import { FC } from 'react';
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { QUERIES } from "config/constants";

import Button from 'components/Buttons/Button';

import { EModals } from "store/modals/types";
import { servicesAllSelectByCodeSelector } from "store/services/selectors";
import { EServiceCode, ETariffPlan } from "store/services/types";

import { TPricingPlanProps } from "../../types";
import { EPlans, usePlanContext } from "../../index";

import PricingCard from "../PricingCard";
import PricingCardFeatures from "../PricingCardFeatures";
import PricingProgress from "../PricingProgress";
import PricingCardPrice from "../PricingCardPrice";

import { availableFeatures } from "./constants";

const PricingPlanSmart: FC<TPricingPlanProps> = ({ active }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { plan } = usePlanContext();
  const smartMonth = useSelector(servicesAllSelectByCodeSelector(EServiceCode.plansSmartMonth));
  const smartYear = useSelector(servicesAllSelectByCodeSelector(EServiceCode.plansSmartYear));
  const smart = plan === EPlans.monthly ? smartMonth : smartYear;

  const openPricingActivateModal = () => {
    history.replace({
      search: `?${QUERIES.modal}=${EModals.activatePricing}&${QUERIES.pricing}=${ETariffPlan.smart}`
    });
  };
  
  return (
    <PricingCard active={active} popular={true}>
      <div className="pricing__card__title">
        {t("pricing.smart")}
      </div>
      <PricingCardPrice active={active} currency={smart?.currency} price={smart?.price}/>

      {active 
        ? <PricingProgress pricing={ETariffPlan.smart}/>
        : (
          <Button 
            title={t("pricing.getSmart")}
            className="pricing__card__btn smart"
            lettuce={true} 
            onClick={openPricingActivateModal}
          />)
      }
      <PricingCardFeatures features={availableFeatures}/>
    </PricingCard>
  );};

export default PricingPlanSmart;