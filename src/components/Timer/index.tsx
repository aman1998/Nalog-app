import { FC } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { blockingTimeSelector } from "store/auth/selectors";
import { resendCodeRequest } from "store/auth/reducers";
import { userBindEmailPhoneResendRequest } from "store/user/reducers";

import { EStorageKeys } from "utils/storageHeplers";

import { TTimerProps } from "./types";

const Timer: FC<TTimerProps> = ({ tokenCode, isResetForm, isBindForm }): JSX.Element => {
  const { t } = useTranslation();
  const blockingTime = useSelector(blockingTimeSelector);

  const dispatch = useDispatch();

  const resendCode = () => {
    if (isBindForm) {
      dispatch(userBindEmailPhoneResendRequest({ code_token: tokenCode }));
    }
    else {
      dispatch(
        resendCodeRequest({
          code_token: tokenCode,
          isReset: isResetForm,
        })
      );
    }
  };

  const renderer = ({ minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return (
        <div className="sign-forgot_timer isTimerEnd" onClick={resendCode}>
          {t("timer.sendCodeAgain")}
        </div>
      );
    } else {
      return (
        <div className="sign-forgot_timer">
          {t("timer.resendVia")} {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      );
    }
  };
  return (
    <Countdown
      autoStart={true}
      key={blockingTime || localStorage.getItem(EStorageKeys.TIMER) || 0}
      date={new Date(blockingTime || localStorage.getItem(EStorageKeys.TIMER) || 0)}
      renderer={renderer}
    />
  );
};

export default Timer;
