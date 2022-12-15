import { FC } from 'react';
import { TooltipRenderProps } from "react-joyride";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";
import CloseIcon from "components/Icons/CloseIcon";

const JoyrideTooltip: FC<TooltipRenderProps> = ({
  index,
  step,
  size,
  closeProps,
  primaryProps,
  tooltipProps,
  backProps,
}) => {
  const { t } = useTranslation();
  return (
    <div className="joyride-tooltip" {...tooltipProps}>
      <div className="joyride-tooltip__data">
        {step.title && <h4  className="joyride-tooltip__title">{step.title}</h4>}
        <div className="joyride-tooltip__content">{step.content}</div>
      </div>
      <div className="joyride-tooltip__footer">
        {index > 0 && (
          <Button {...backProps} type="link" title={t("naming.back")} className="joyride-tooltip__back"/>
        )}
        <span className="joyride-tooltip__size">{index+1}/{size}</span>
        <Button
          {...primaryProps}
          className="joyride-tooltip__next"
          title={index+1 === size? t("naming.done"): t("naming.next")}
        />
      </div>
      <div {...closeProps} className="joyride-tooltip__close" id="close">
        <CloseIcon />
      </div>
    </div>
  );
};

export default JoyrideTooltip;