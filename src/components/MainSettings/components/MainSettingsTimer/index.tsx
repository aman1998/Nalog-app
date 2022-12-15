import { FC, memo, useEffect, useState } from 'react';
import Moment from "react-moment";
import timezone from "moment-timezone";

export type MainSettingsTimerProps = {
  timeZone: string
}

const interval = 1000;

const MainSettingsTimer: FC<MainSettingsTimerProps> = memo(({ timeZone }) => {
  const [dateToFormat, setDateToFormat] = useState(new Date());
  const updateTime = () => new Date();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = updateTime();
      setDateToFormat(
        time
      );
    }, interval);
    return(() => {
      clearInterval(intervalId);
    });
  },[]);

  return <Moment interval={interval} format={"HH:mm"}>
    {timezone(dateToFormat, "ddd MMM DD HH:mm:ss ZZ YYYY", "UTC").tz(timeZone)}
  </Moment>;
});

export default MainSettingsTimer;