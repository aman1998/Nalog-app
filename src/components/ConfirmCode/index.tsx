import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { EValidateNames } from "config/types";

import Input from "components/Inputs/Input";
import Timer from "components/Timer/index";

import { userBindEmailPhoneCodeRequest, userBindEmailPhoneCodeFailure } from "store/user/reducers";
import { errorsBindEmailPhoneCodeSelector } from "store/user/selectors";
import { codeTokenSelector, blockingTimeSelector } from "store/auth/selectors";

import { handleValidate } from "utils/validatePhoneMail";
import { EStorageKeys } from "utils/storageHeplers";

import { ConfirmCodeProps } from "./types";

const ConfirmCode: FC<ConfirmCodeProps> = ({ username }) => {
  const { t } = useTranslation();
  const [code, setCode] = useState("");

  const codeToken = useSelector(codeTokenSelector);
  const parsedErrors = useSelector(errorsBindEmailPhoneCodeSelector)?.parsedErrors;
  const blockingTime = useSelector(blockingTimeSelector);

  const dispatch = useDispatch();

  const isEmailPhone = username && handleValidate(username);

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    dispatch(userBindEmailPhoneCodeFailure(null));
  };

  useEffect(() => {
    if (code.length > 5 && !code.split("").filter(s => s === "_").length) {
      dispatch(
        userBindEmailPhoneCodeRequest({
          code_token: codeToken ?? '',
          code,
        })
      );
    }
    return () => {
      dispatch(userBindEmailPhoneCodeFailure(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  
  useEffect(() => {
    if (!!blockingTime) localStorage.setItem(EStorageKeys.TIMER, blockingTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeToken]);

  return (
    <div className="confirm-code">
      <p className="confirm-code__text">
        {isEmailPhone === EValidateNames.phone
          ? t("confirmCode.weSentAnSMS")
          : t("confirmCode.weSentAnEmail")}
        <p>{username}</p>
      </p>
      <Input
        type="text"
        className={cn("check_input confirm-code__input", {
          _inputError: !!parsedErrors,
        })}
        placeholder="______"
        onChange={handleCodeChange}
        mask="111111"
        autoFocus={true}
        style={{ textAlign: "center" }}
      />
      <div
        className={cn("validate code-validate", {
          "validate-active":
            parsedErrors?.code || parsedErrors?.code_token || parsedErrors?.email || parsedErrors?.phone,
        })}
      >
        {parsedErrors?.code}
        {parsedErrors?.code_token}
        {parsedErrors?.email}
        {parsedErrors?.phone}
      </div>
      <Timer
        tokenCode={codeToken || ""}
        isBindForm={true}
      />
    </div>
  );
};

export default ConfirmCode;
