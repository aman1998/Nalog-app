import { FC } from "react";
import { Modal } from "antd";

import ModalWrapperHeader from "./components/ModalWrapperHeader";
import { IModalProps } from "./types";

// need use this component for bind other modals
const ModalWrapper: FC<IModalProps> = ({
  children,
  className,
  visible,
  title,
  subTitle,
  closeModal,
  handleBack,
  ...rest
}
) => (
  <Modal
    className={`default-modal ${className}`}
    visible={visible}
    centered={true}
    title={false}
    footer={false}
    closeIcon={false}
    onCancel={closeModal}
    {...rest}
  >
    <ModalWrapperHeader title={title} closeModal={closeModal} subTitle={subTitle} handleBack={handleBack} />
    <div className="default-modal__content">
      <div className="default-modal__form">
        {children}
      </div>
    </div>
  </Modal>
);

export default ModalWrapper;
