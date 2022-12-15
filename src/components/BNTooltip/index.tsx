import { CSSProperties, FC, useMemo } from "react";
import { Tooltip as AntdTooltip } from "antd";
import { TooltipProps } from "antd/es/tooltip";
import { useMediaQuery } from "react-responsive";

import { mobileMediaWidth } from "config/constants";

import useWindowDimensions from "hooks/useWindowDimensions";

import TooltipTitle from "./component/TooltipTitle";

const BNTooltip: FC<TooltipProps> = ({ children, className, color = "white", title, ...rest }) => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  const overlayInnerStyle: CSSProperties = useMemo(() => ({
    width: windowWidth ? windowWidth - 16 : "none"
  }), [windowWidth]);

  return (
    <AntdTooltip
      {...rest}
      className="bn-tooltip"
      overlayClassName={className}
      color={color}
      title={<TooltipTitle  title={title} />}
      overlayInnerStyle={isMobile ? overlayInnerStyle : undefined}
      placement={isMobile ? "bottom" : "top"}
    >
      {children}
    </AntdTooltip>
  );
};

export default BNTooltip;
