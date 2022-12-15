import { FC } from "react";

import InfoIcon from "components/Icons/InfoIcon";

import { TooltipTitleProps } from "./types";

const TooltipTitle: FC<TooltipTitleProps> = ({ title }) => (
  <div className="tooltip-title">
    <InfoIcon /> {title}
  </div>
);

export default TooltipTitle;
