import { FC } from "react";
import { useSelector } from "react-redux";

import { userPlanInfoSelector } from "store/user/selectors";
import { ETariffPlan } from "store/services/types";

import PricingPlanFree from "../PricingPlanFree";
import PricingPlanPro from "../PricingPlanPro";
import PricingPlanSmart from "../PricingPlanSmart";

const PricingCards: FC = () => {
  const { data: userPlan } = useSelector(userPlanInfoSelector);
  const tariffPlan = userPlan?.current_plan.tariff_plan;

  return (
    <div className="pricing__cards">
      <PricingPlanFree active={tariffPlan === ETariffPlan.free}/>
      <PricingPlanSmart active={tariffPlan === ETariffPlan.smart}/>
      <PricingPlanPro active={tariffPlan === ETariffPlan.pro}/>
    </div>
  );
};

export default PricingCards;