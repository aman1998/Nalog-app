import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";
import { EValidateNames } from "config/types";

import Timer from "components/Timer/index";
import ArrowIcon from "components/Icons/ArrowIcon";
import Input from "components/Inputs/Input";

import {
  codeTokenSelector,
  blockingTimeSelector,
  resetCodeFailureSelector,
} from "store/auth/selectors";
import {
  closeCode,
  getCodeRequest,
  getResetCodeFailure,
  getResetCodeRequest,
} from "store/auth/reducers";

import { handleValidate } from "utils/validatePhoneMail";
import { EStorageKeys } from "utils/storageHeplers";

import { AuthCheckFormProps } from "./types";

// TODO: Need to transfer this jsx and logic to ConfirmCode component
const AuthCheckForm: FC<AuthCheckFormProps> = ({ username, isResetForm }) => {
  const { t } = useTranslation();
  const [code, setCode] = useState("");

  const codeToken = useSelector(codeTokenSelector);
  const parsedErrors = useSelector(resetCodeFailureSelector)?.parsedErrors;
  const blockingTime = useSelector(blockingTimeSelector);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isEmailPhone = username && handleValidate(username);

  const goBack = () => {
    dispatch(closeCode());
  };

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    dispatch(getResetCodeFailure(null));
  };

  useEffect(() => {
    if (code.length > 5 && !code.split("").filter(s => s === "_").length) {
      if (isResetForm) {
        dispatch(
          getResetCodeRequest({
            code_token: codeToken,
            code,
          })
        );
      } else {
        dispatch(
          getCodeRequest({
            code_token: codeToken || location.hash.slice(1),
            code,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (!!blockingTime) localStorage.setItem(EStorageKeys.TIMER, blockingTime);
    if (!isResetForm) {
      history.push({
        pathname: paths.SIGN_UP,
        hash: codeToken || location.hash || "sdsd",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeToken]);

  useEffect(
    () => () => {
      dispatch(closeCode());
      if (!isResetForm) {
        history.push({
          pathname: paths.SIGN_UP,
          hash: "",
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      className={cn("check-form", {
        check: !isResetForm,
      })}
    >
      {!isResetForm && (
        <h1 className="check_title">{t("authCheckForm.title")}</h1>
      )}
      <p className="check_text">
        {isEmailPhone === EValidateNames.phone
          ? t("authCheckForm.text1")
          : t("authCheckForm.text2")}
        <span>{username}</span>
      </p>
      <Input
        type="text"
        className={cn("check_input code-input", {
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
          "validate-active": parsedErrors?.code || parsedErrors?.code_token,
        })}
      >
        {parsedErrors?.code}
        {parsedErrors?.code_token}
      </div>
      <Timer
        tokenCode={codeToken || location.hash.slice(1) || ""}
        isResetForm={isResetForm}
      />
      {!isResetForm && (
        <div className="check_icon" onClick={goBack}>
          <ArrowIcon />
        </div>
      )}
    </div>
  );
};

export default AuthCheckForm;
