import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import get from "lodash/get";

import BNSwitcher from "components/BNSwitcher";

import { ELinks } from "../../config/types";
import { getUserInfoSettingsDataSelector } from "../../store/user/selectors";

import PasswordForm from "./components/PasswordForm";
import SafetyBindSettings from "./components/SafetyBindSettings";
import SafetySession from "./components/SafetySession";

const SafetySettings: FC = () => {
  const { t } = useTranslation();
  const userInfo = useSelector(getUserInfoSettingsDataSelector);
  const email = get(userInfo, "email");
  const phone = get(userInfo, "phone");
  const showEditPassword = email || phone;

  return (
    <div className="settings-safety" id="settings">
      <h2 className="settings_title">{t(ELinks.SETTINGS_SAFETY)}</h2>
      <div className="settings__item auth-item">
        <h3 className="item-title">OAuth {t('auth.authorization')}</h3>
        <div className="auth-item_content">
          <span>Telegram</span>
          <BNSwitcher
            defaultChecked={true}
            className="auth-switcher"
            disabled={true}
          />
          <p>@cryptonnik, Dmitry Nikolskiy</p>
        </div>
      </div>
      <SafetyBindSettings />
      {showEditPassword && <div className="settings__item password-item">
        <h3 className="item-title">{t('auth.password')}</h3>
        <PasswordForm />
      </div>}
      {false && <div className="settings__item session-item">
        <h3 className="item-title">{t("auth.activeSessions")}</h3>
        <SafetySession />
      </div>}
    </div>
  );
};

export default SafetySettings;
