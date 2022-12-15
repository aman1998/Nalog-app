
import { TChildren } from "../../config/types";

import StepWidgetComponent from "./components/StepWidgetComponent";

export type TStep<T> = {
  index: T;
  next?: () => void;
  disableNext?: boolean;
  prev?: () => void;
  title: string;
  mobileTitle?: string;
  nextButton?: string;
  content?: TChildren;
  widget?: TChildren;
}

export type StepWidgetProps<T> = {
  title: string;
  current: T;
  steps: TStep<T>[];
  loading?: boolean;
  showDefault?: boolean;
  defaultComponent?: TChildren;
  onClickStep?: (index: T) => void;
}

const StepWidget = <T extends number>({
  title,
  current ,
  steps,
  loading,
  showDefault,
  defaultComponent,
  onClickStep,
}: StepWidgetProps<T>): JSX.Element => {
  const activeStep = steps.find(step => step.index === current);
  return (
    <div className="step-widget__wrapper">
      {activeStep && <StepWidgetComponent
        title={title}
        steps={steps}
        activeStep={activeStep}
        current={current}
        loading={loading}
        onClickStep={onClickStep}
      />}
      {
        showDefault && defaultComponent
          ? defaultComponent
          : activeStep?.content
      }
    </div>
  );
};

export default StepWidget;
