import { FC } from "react";
import { Popover as PopoverAnt } from 'antd';
import { PopoverProps } from "antd/lib/popover";

const Popover: FC<PopoverProps> = ({ content, trigger, children }) => (
  <PopoverAnt content={content} trigger={trigger}>
    {children}
  </PopoverAnt>
);

export default Popover;
