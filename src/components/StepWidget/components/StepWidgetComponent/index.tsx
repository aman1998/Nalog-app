import { useMediaQuery } from "react-responsive";
import cn from "classnames";
import { Steps } from "antd";

import { maxMobileMediaWidth, maxTableMediaWidth } from "config/constants";

import { useScrollDirection } from "hooks/useScrollDirection";
import { EScrollDirection } from "hooks/types";

import { TStep } from "../../index";

import StepWidgetHeaderMobileTop from "../StepWidgetHeaderMobile";
import StepWidgetHeaderDesktop from "../StepWidgetHeaderDesktop";

const { Step } = Steps;

export type StepWidgetHeaderProps<T> = {
  title: string;
  current: T;
  steps: TStep<T>[];
  activeStep: TStep<T>;
  loading?: boolean;
  onClickStep?: (index: T) => void;
}

const StepWidgetComponent = <T extends number>({
  title ,
  current ,
  steps,
  loading,
  onClickStep,
  activeStep
}: StepWidgetHeaderProps<T>): JSX.Element =>{
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });
  const isDesktop = useMediaQuery({ query: `(min-width: ${maxTableMediaWidth}px)` });
  const [, scrollDir] = useScrollDirection();
  const { next, prev, nextButton, title: subTitle, mobileTitle: mobileSubTitle, widget, disableNext } = activeStep;

  const handleClickSteps = (step: T) => {
    if(current > step && onClickStep) {
      onClickStep(step);
    }
  };
  
  return (
    <div className={cn("step-widget", {
      stickyTop: scrollDir === EScrollDirection.up && isDesktop
    })}>
      {
        isMobile &&
        <StepWidgetHeaderMobileTop
          next={next}
          nextButton={nextButton}
          disableNext={disableNext}
          prev={prev}
          title={title}
          subTitle={mobileSubTitle || subTitle}
        />
      }
      <div className="step-widget__steps">
        <div className="container">
          {
            !isMobile &&
            <StepWidgetHeaderDesktop
              title={title}
              loading={loading}
              next={next}
              nextButton={nextButton}
              disableNext={disableNext}
            />
          }
          <Steps initial={1} current={current} className="step-widget__steps__list">
            {steps.map((item: TStep<T>, index) => (
              <Step
                className={cn("step-widget__steps__item", {
                  createDocumentStepsListItemClickable: current > index + 1
                })}
                stepNumber={index + 1}
                key={item.index}
                title={item.title}
                onClick={() => handleClickSteps(item.index)}
              />
            ))}
          </Steps>
          { widget }
        </div>
      </div>
    </div>
  );};

export default StepWidgetComponent;