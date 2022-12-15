import { FC } from "react";

import VectorArrowIcon from "components/Icons/VectorArrowIcon";
import CloseIcon from "components/Icons/CloseIcon";

import { ISettingsModalHeader } from "./types";

const SettingsModalHeader: FC<ISettingsModalHeader> = ({ title, setShowCode, setVisible, showCode }) => {
  const handleBack = () => {
    setShowCode(false);
  };

  return (
    <div className="bind-header-modal">
      <div className="bind-header-modal_backIcon" onClick={handleBack}>
        {showCode && <VectorArrowIcon />}
      </div>
      <div className="bind-header-modal_title">{title}</div>
      <div className="bind-header-modal_closeIcon" onClick={() => setVisible(false)}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default SettingsModalHeader;
