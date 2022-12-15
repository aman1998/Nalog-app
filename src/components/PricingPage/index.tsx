import { createContext, FC, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { userPlanInfoRequest } from "store/user/reducers";
import { servicesAllRequest } from "store/services/reducers";

import PricingCards from "./components/PricingCards";
import PricingHeader from "./components/PricingHeader";
import PricingActivateModal from "./components/PricingActivateModal";

export enum EPlans {
  monthly = "monthly",
  annually = "annually",
}

export type TPlanContextValue = { plan?: EPlans, setPlan?: (val: EPlans) => void };
const PlanContext = createContext<TPlanContextValue>({});
export const usePlanContext = (): TPlanContextValue => useContext(PlanContext);

const PricingPage: FC = () => {
  const dispatch = useDispatch();
  const [plan, setPlan] = useState<EPlans>(EPlans.annually);

  useEffect(() => {
    dispatch(userPlanInfoRequest());
    dispatch(servicesAllRequest());
  }, []);

  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      <div className="pricing">
        <PricingHeader/>
        <PricingCards/>
        <PricingActivateModal/>
      </div>
    </PlanContext.Provider>
  );
};

export default PricingPage;