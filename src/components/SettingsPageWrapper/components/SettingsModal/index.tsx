import { Modal } from "antd";
import { FC } from "react";

import SettingsModalHeader from "./components/SettingsModalHeader";
import { ISettingsModalHeader } from "./types";

const SettingsModal: FC<ISettingsModalHeader> = ({
  children,
  visible,
  showCode,
  setVisible,
  title,
  setShowCode,
}): JSX.Element => {
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      className="bind-modal"
      centered={true}
      title={false}
      footer={false}
      visible={visible}
      onCancel={handleCancel}
      width={588}
    >
      <SettingsModalHeader showCode={showCode} title={title} setShowCode={setShowCode} setVisible={setVisible} />
      {children}
    </Modal>
  );
};

export default SettingsModal;
