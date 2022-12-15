import { FC, useMemo } from "react";
import { useHistory } from "react-router";

import { ServiceModalStepProps } from "../../types";

import ServiceModalSelect from "../ServiceModalSelect";
import ServiceModalPromoCode from "../ServiceModalPromoCode";
import ServiceModalActivated from "../ServiceModalActivated";

import { EServiceModalSteps } from "./types";

const ServiceModalSteps: FC<ServiceModalStepProps> = ({ activeStep, setActiveStep }) => {
  const history = useHistory();

  const setStep = (s: EServiceModalSteps) => {
    setActiveStep(s);
    history.push({
      search: `?modal=${s}`,
    });
  };

  const steps: Record<EServiceModalSteps, JSX.Element> = {
    [EServiceModalSteps.first]: <ServiceModalSelect setStep={setStep} />,
    [EServiceModalSteps.second]: <ServiceModalPromoCode setStep={setStep} />,
    [EServiceModalSteps.third]: <ServiceModalActivated />,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => steps[activeStep], [activeStep]);
};

export default ServiceModalSteps;
