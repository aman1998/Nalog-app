import { FC } from 'react';
import Modal from "antd/lib/modal";
import cn from "classnames";

import { SimpleSubmitModalProps } from "./types";

const SimpleSubmitModal: FC<SimpleSubmitModalProps> = ({
  visible, children, onCancel, title, className, classContent
}) => (
  <Modal
    visible={visible}
    title={false}
    footer={false}
    centered={true}
    onCancel={onCancel}
    className={cn("simple-submit-modal", className)}
    okButtonProps={{ disabled: true }}
    cancelButtonProps={{ disabled: true }}
    closeIcon={<></>}
    width={416}
  >
    <div className={cn("simple-submit-modal__wrapper", classContent)}>
      <div className="simple-submit-modal__title">{title}</div>
      {children}
    </div>
  </Modal>
);

export default SimpleSubmitModal;