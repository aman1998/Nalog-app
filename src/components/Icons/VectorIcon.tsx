import { colors } from "config/constants";

{/* eslint-disable max-len */}
const VectorIcon = ({ fill = "rgba(0, 0, 0, 0.85)", className }: {fill?: string, className?: string}): JSX.Element => (
  <svg width="7" height="11" viewBox="0 0 7 11" fill={fill} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.83925 1.70708V0.671813C6.83925 0.582081 6.73613 0.532527 6.66649 0.587438L0.628985 5.30306C0.577688 5.34296 0.53618 5.39404 0.507628 5.45241C0.479076 5.51079 0.464233 5.57491 0.464233 5.63989C0.464233 5.70488 0.479076 5.769 0.507628 5.82738C0.53618 5.88575 0.577688 5.93683 0.628985 5.97672L6.66649 10.6923C6.73747 10.7473 6.83925 10.6977 6.83925 10.608V9.57271C6.83925 9.50708 6.80845 9.44413 6.75756 9.40396L1.93613 5.64056L6.75756 1.87583C6.80845 1.83565 6.83925 1.77271 6.83925 1.70708Z" fill={colors.gray9}/>
  </svg>

);

export default VectorIcon;
