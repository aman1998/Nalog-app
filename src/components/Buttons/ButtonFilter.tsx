import cn from "classnames";
import { FC } from "react";

import { IButtonFilter } from "./types";

const ButtonFilter: FC<IButtonFilter> = ({ title, onClick, className, isActive }) => (
  <button
    className={cn(`btn-filter ${className}`, {
      _isActiveFilter: isActive,
      _isPassiveFilter: !isActive,
    })}
    onClick={onClick}
  >
    {title}
  </button>
);

export default ButtonFilter;
