import { FC } from "react";
import moment from "moment";

import { declension } from "utils/declension";

import { TRemainngDaysProps } from "./types";

const RemainingDays: FC<TRemainngDaysProps> = (
  { date, className = "remaining-day", widthDaysText= true }) => {

  const getRemaingDay = () => {
    const given = moment(date, "YYYY-MM-DD");
    const current = moment().startOf('day');

    return moment.duration(given.diff(current)).asDays();
  };

  return (
    <>
      { widthDaysText ?
        <p className={className}>{declension(getRemaingDay())}</p> :
        <p className={className}>{getRemaingDay()}</p>
      }
    </>
  );
};

export default RemainingDays;
