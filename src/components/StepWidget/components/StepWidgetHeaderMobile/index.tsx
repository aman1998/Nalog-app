import { FC } from "react";
import cn from "classnames";

import ArrowIcon from "components/Icons/ArrowIcon";

export type StepWidgetHeaderMobileProps = {
  title: string
  disableNext?: boolean;
  prev?: () => void;
  next?: () => void;
  nextButton?: string;
  subTitle?: string
}

const StepWidgetHeaderMobile: FC<StepWidgetHeaderMobileProps> = ({
  title, prev, next, disableNext, subTitle, nextButton
}) => {
  const handleClickNext = () => (!disableNext && next) && next();

  return (
    <div className="step-widget__header-mobile">
      <div className="step-widget__header-mobile__arrow" onClick={prev}><ArrowIcon /></div>
      <div className="step-widget__header-mobile__title-wrapper">
        <div className="step-widget__header-mobile__title">
          {title}
        </div>
        {
          !!next &&
            <div className="step-widget__header-mobile__sub-title">{subTitle}</div>
        }
      </div>
      <div className={
        cn("step-widget__header-mobile__btn", { disable: disableNext || !next })} onClick={handleClickNext}
      >
        {nextButton}
      </div>
    </div>
  );
};

export default StepWidgetHeaderMobile;
