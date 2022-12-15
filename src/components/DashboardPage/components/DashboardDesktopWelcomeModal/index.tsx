import { FC, useEffect, useState } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

import { EAppNames } from "config/types";

import BitOkIcon from "components/Icons/BitOkIcon";
import Button from "components/Buttons/Button";
import BitnalogIcon from "components/Icons/BitnalogIcon";

import { EStorageKeys } from "utils/storageHeplers";

import { DashboardDesktopWelcomeModalProps } from "./types";

const DashboardDesktopWelcomeModal: FC<DashboardDesktopWelcomeModalProps> = ({ title, text, onSubmit }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const greeting = localStorage.getItem(EStorageKeys.GREETING);
  const { t } = useTranslation();

  useEffect(() => {
    if (greeting) setVisible(Boolean(greeting));

  }, [greeting]);

  const handleStartClick = () => {
    onSubmit();
    setVisible(false);
    localStorage.removeItem(EStorageKeys.GREETING);
  };

  const handleOnCancel = () => {
    setVisible(false);
    localStorage.removeItem(EStorageKeys.GREETING);
  };

  return <Modal
    visible={visible}
    title={false}
    footer={false}
    centered={true}
    onCancel={handleOnCancel}
    className="dashboard-welcome-modal__wrapper"
  >
    <div className="dashboard-welcome-modal">
      <div className="dashboard-welcome-modal__header">
        {process.env.REACT_APP_NAME === EAppNames.bitOk ? <BitOkIcon/> : <BitnalogIcon/>}
      </div>
      <div className="dashboard-welcome-modal__data">
        <div className="dashboard-welcome-modal__title">
          {title} <span className="dashboard-welcome-modal__handshake">✋</span>
        </div>
        <div className="dashboard-welcome-modal__text" dangerouslySetInnerHTML={{ __html: text }}/>
      </div>
      <Button
        className="dashboard-welcome-modal__start"
        title={t("dashboardDesktopWelcomeModal.start")}
        onClick={handleStartClick}
      />
    </div>
  </Modal>;
};

export default DashboardDesktopWelcomeModal;
