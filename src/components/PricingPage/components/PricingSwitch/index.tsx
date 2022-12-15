import { FC } from 'react';
import isFunction from "lodash/isFunction";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import i18n from "../../../../i18n";

import { EPlans, usePlanContext } from "../../index";

const PricingSwitch: FC = () => {
  const { t } = useTranslation();
  const { plan, setPlan } = usePlanContext();
  const plans = [
    {
      title: i18n.t("pricing.monthly"),
      value: EPlans.monthly
    },
    {
      title: i18n.t("pricing.annually"),
      value: EPlans.annually
    },
  ];

  const handleClickPlan = ($plan: EPlans) => {
    if(isFunction(setPlan)) setPlan($plan);
  };

  return (
    <div className="pricing__switch">
      <div>
        <div className="pricing__switch__plans">
          {
            plans.map($plan => (
              <div
                key={$plan.value}
                className={cn("pricing__switch__plan", { active: $plan.value === plan })}
                onClick={() => handleClickPlan($plan.value)}
              >
                { $plan.title }
              </div>
            ))
          }
        </div>
      </div>

      <div className="pricing__switch__text">
        {t("pricing.saveAnnualPlan")}
      </div>
    </div>
  );
};

export default PricingSwitch;