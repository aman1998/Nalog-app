import { Progress } from "antd";
import { FC } from "react";
import cn from "classnames";

import { colors } from "config/constants";

type TProgressInfo = {
  number: number;
  max: number;
  title?: string;
  unit?: string;
  noLimit?: boolean;
}

const ProgressInfo: FC<TProgressInfo> = ({ number: $number, max, title, unit, noLimit }) =>{
  const percent = ($number * 100) / max;
  const formUnit = () => {
    if (noLimit) {
      return "No limitation";
    }
    return <>{$number}/{max} {unit}</>;
  };
  return (
    <div className="progress-info">
      <div className="progress-info__top">
        {title && <div className="progress-info__title">
          {title}
        </div>}
        <div className={cn("progress-info__unit", { "no-limit": noLimit })}>
          {formUnit()}
        </div>
      </div>
      <Progress
        percent={!noLimit ? percent : 0}
        showInfo={false}
        strokeColor={colors.pink}
        trailColor={!noLimit ? colors.gray5 : colors.gray3}
      />
    </div>
  );
};

export default ProgressInfo;