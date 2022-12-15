import { FC } from "react";

import VectorArrowIcon from "components/Icons/VectorArrowIcon";
import CloseIcon from "components/Icons/CloseIcon";

import { ModalWrapperHeaderProps } from "./types";

const ModalWrapperHeader: FC<ModalWrapperHeaderProps> = ({
  title,
  subTitle,
  closeModal,
  handleBack
}) => (
  <div className="header-modal">
    {
      handleBack ?
        <div className="header-modal__backIcon" onClick={handleBack}>
          <VectorArrowIcon />
        </div> :
        <div className="header-modal__backIcon header-modal__backIcon--no-cursor" />
    }
    <div className="header-modal__center">
      <div className="header-modal__title">{title}</div>
      {subTitle && <div className="header-modal__sub-title">{subTitle}</div>}
    </div>
    <div className="header-modal__closeIcon" onClick={closeModal}>
      <CloseIcon />
    </div>
  </div>
);

export default ModalWrapperHeader;
