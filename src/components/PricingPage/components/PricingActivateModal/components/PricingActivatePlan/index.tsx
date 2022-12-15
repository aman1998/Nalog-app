import { FC } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";

import { EPricingActivateModalSteps } from "../../index";

import PriceActivatePromoCodeForm from "../PriceActivatePromoCodeForm";
import PriceActivateMainInfo from "../PriceActivateMainInfo";

export type TPricingActivatePlanProps = {
  setStep: (val: EPricingActivateModalSteps) => void;
}

const PricingActivatePlan: FC<TPricingActivatePlanProps> = ({ setStep }) => {
  const { t } = useTranslation();

  const onClick = () => {
    setStep(EPricingActivateModalSteps.two);
  };

  return (
    <>
      <PriceActivateMainInfo/>
      <PriceActivatePromoCodeForm/>
      <Button
        title={t("serviceModal.toPay")}
        className="pricing__activate__btn"
        onClick={onClick}
      />
    </>
  );};

export default PricingActivatePlan;