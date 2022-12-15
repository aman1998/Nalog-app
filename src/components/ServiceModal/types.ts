import { EServiceModalSteps } from "./components/ServiceModalSteps/types";


export type ServiceModalProps = {
  finalCall?: () => void;
  startFrom?: EServiceModalSteps;
}

export type ServiceModalStepProps = {
  activeStep: EServiceModalSteps;
  setActiveStep: (step: EServiceModalSteps) => void;
};

export type ServiceModalStepsProps = {
  setStep?: (step: EServiceModalSteps) => void;
};

export type TServiceModalFinalCall =  undefined | (() => void);
export type TServiceModalStartFrom =  undefined | EServiceModalSteps;