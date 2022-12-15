import { FC } from "react";

import { colors } from "config/constants";

{/* eslint-disable max-len */}
const CheckIcon: FC<{color: string}> = ({ color= colors.green3 }): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.1437 2.25H13.8955C13.7205 2.25 13.5544 2.33036 13.4473 2.46786L6.08478 11.7946L2.55442 7.32143C2.50101 7.25362 2.43294 7.1988 2.35531 7.16106C2.27768 7.12333 2.19252 7.10368 2.1062 7.10357H0.85799C0.738347 7.10357 0.672275 7.24107 0.74549 7.33393L5.63656 13.5304C5.86513 13.8196 6.30442 13.8196 6.53478 13.5304L15.2562 2.47857C15.3294 2.3875 15.2633 2.25 15.1437 2.25Z" fill={color}/>
  </svg>
);

export default CheckIcon;
