import { default as React } from "react";
import { RenderFunction } from "antd/es/tooltip";

export type TooltipTitleProps = {
  title: React.ReactNode | RenderFunction;
};