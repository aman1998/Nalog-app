import { FC } from "react";

import { IIconsProps } from "config/types";
import { colors } from "config/constants";

{/* eslint-disable max-len */}
const CloseCircleIcon: FC<IIconsProps> = ({ className, onClick, fill= colors.gray6 }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
    <g clipPath="url(#clip0_1648_21787)">
      <path d="M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0ZM10.9536 11.0393L9.775 11.0339L8 8.91786L6.22679 11.0321L5.04643 11.0375C4.96786 11.0375 4.90357 10.975 4.90357 10.8946C4.90357 10.8607 4.91607 10.8286 4.9375 10.8018L7.26071 8.03393L4.9375 5.26786C4.91592 5.24169 4.90395 5.20892 4.90357 5.175C4.90357 5.09643 4.96786 5.03214 5.04643 5.03214L6.22679 5.0375L8 7.15357L9.77321 5.03929L10.9518 5.03393C11.0304 5.03393 11.0946 5.09643 11.0946 5.17679C11.0946 5.21071 11.0821 5.24286 11.0607 5.26964L8.74107 8.03572L11.0625 10.8036C11.0839 10.8304 11.0964 10.8625 11.0964 10.8964C11.0964 10.975 11.0321 11.0393 10.9536 11.0393Z" fill={fill} />
    </g>
    <defs>
      <clipPath id="clip0_1648_21787">
        <rect width="16" height="16" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export default CloseCircleIcon;
