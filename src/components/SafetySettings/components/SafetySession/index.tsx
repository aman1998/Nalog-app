import { useTranslation } from "react-i18next";

const SafetySession = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="session-item_lists">
      <div className="session-item_list">
        <div className="list-title">{t("safetySession.item1Title")}</div>
        <p className="list-text">{t("safetySession.item1Text")}</p>
        <p className="list-btn list-active">{t("safetySession.item1Btn")}</p>
      </div>
      <div className="session-item_list">
        <div className="list-title">{t("safetySession.item2Title")}</div>
        <p className="list-text">{t("safetySession.item2Text")}</p>
        <p className="list-btn">{t("safetySession.item2Btn")}</p>
      </div>
      <div className="session-item_list">
        <div className="list-title">{t("safetySession.item2Title")}</div>
        <p className="list-text">{t("safetySession.item2Text")}</p>
        <p className="list-btn">{t("safetySession.item2Btn")}</p>
      </div>
    </div>
  );};

export default SafetySession;
