import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { EValidateNames } from "config/types";

import SettingsModal from "components/SettingsPageWrapper/components/SettingsModal";

import { showBindCodeSelector, showBindPopupSelector } from "store/user/selectors";
import { showBindCodeForm, showBindPopup as showBindPopupAction, clearCodeState } from "store/user/reducers";

import { SafetyBindSettingsModalPops } from "./types";
import SafetyBindSettingsModalForm from "./components/SafetyBindSettingsModalForm";

const SafetyBindSettingsModal: FC<SafetyBindSettingsModalPops> = ({ isModalType }) => {
  const { t } = useTranslation();
  const modalTitle = isModalType === EValidateNames.phone
    ? t("safetyBindSettingsModal.phone")
    : t("safetyBindSettingsModal.email");

  const showBindCode = useSelector(showBindCodeSelector) as boolean;
  const showBindPopup = useSelector(showBindPopupSelector) as boolean;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!showBindPopup) {
      dispatch(showBindCodeForm(false));
      dispatch(clearCodeState());
    }
  }, [showBindPopup]);

  const handleShowCode = (value: boolean) => {
    dispatch(showBindCodeForm(value));
  };

  const handleBindPopup = (value: boolean) => {
    dispatch(showBindPopupAction(value));
  };

  return (
    <SettingsModal
      setShowCode={handleShowCode}
      showCode={showBindCode}
      title={!showBindCode
        ? `${t("safetyBindSettingsModal.binding")} ${modalTitle}`
        : `${t("safetyBindSettingsModal.confirmation")} ${modalTitle}`}
      visible={showBindPopup}
      setVisible={handleBindPopup}
    >
      <SafetyBindSettingsModalForm
        isModalName={isModalType}
      />
    </SettingsModal>
  );
};

export default SafetyBindSettingsModal;
