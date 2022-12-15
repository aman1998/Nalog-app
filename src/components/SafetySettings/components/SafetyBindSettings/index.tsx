import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { EValidateNames } from "config/types";

import Button from "components/Buttons/Button";

import { getUserSettingsInfoRequest, userSendActivateEmailLinkRequest, showBindPopup } from "store/user/reducers";
import {
  checkEmailConfirmedSelector,
  getEmailSelector,
  getPhoneSelector,
  getUserInfoSettingsFetchingSelector,
  dataBindEmailPhoneCodeSelector
} from "store/user/selectors";

import SafetyBindSettingsModal from "../SafetyBindSettingsModal";

const SafetyBindSettings = (): JSX.Element => {
  const { t } = useTranslation();
  const [isModalType, setIsModalType] = useState('');

  const email = useSelector(getEmailSelector);
  const phone = useSelector(getPhoneSelector);
  const loading = useSelector(getUserInfoSettingsFetchingSelector);
  const checkEmailConfirmed = useSelector(checkEmailConfirmedSelector);
  const dataBindEmailPhoneCode = useSelector(dataBindEmailPhoneCodeSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSettingsInfoRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBindEmailPhoneCode]);

  const handleBindModal = (type: string) => {
    dispatch(showBindPopup(true));
    setIsModalType(type);
  };

  return (
    <>
      <div className="settings__item email-item">
        {!loading && (
          <>
            <h3 className="item-title">{t("naming.email")} </h3>
            {!!email && <p className="item_text">{email}</p>}
            {!!email && !checkEmailConfirmed && (
              <p className="item_text danger">
                {t("safetyBindSettings.mailNotConfirmed")}
                <a className="item-link email" onClick={() => dispatch(userSendActivateEmailLinkRequest())}>
                  {t("safetyBindSettings.sendLink")}
                </a>
              </p>
            )}
            {!email && (
              <Button
                title={t("safetyBindSettings.bindMail")}
                className="item_btn"
                transparent={true}
                onClick={() => handleBindModal(EValidateNames.email)}
              />
            )}
          </>
        )}
      </div>
      <div className="settings__item phone-item">
        {!loading && (
          <>
            <h3 className="item-title">{t("naming.phoneNumber")} </h3>
            {!!phone ? (
              <p className="item_text">
                {phone[0] === "7" && "+"}
                {phone}
              </p>
            ) : (
              <Button
                title={t("safetyBindSettings.bindPhone")}
                className="item_btn"
                transparent={true}
                onClick={() => handleBindModal(EValidateNames.phone)}
              />
            )}
          </>
        )}
      </div>
      <SafetyBindSettingsModal isModalType={isModalType} />
    </>
  );
};

export default SafetyBindSettings;
