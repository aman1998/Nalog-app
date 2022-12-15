import Modal from "antd/lib/modal";
import { FC } from "react";
import cn from "classnames";

import { TNewReportCancelModalProps } from "./types";

const ConfirmModal: FC<TNewReportCancelModalProps> = ({
  visible,
  onOk,
  onCancel ,
  icon,
  text,
  title,
  btns,
  className,
  width
}) => (
  <Modal
    visible={visible}
    title={false}
    footer={false}
    centered={true}
    onOk={onOk}
    onCancel={onCancel}
    className={cn("confirm-modal", className)}
    okButtonProps={{ disabled: true }}
    cancelButtonProps={{ disabled: true }}
    closeIcon={<></>}
    width={width ? width : 400}
  >
    <div className="confirm-modal__wrapper">
      <div className="confirm-modal__body">
        <div className="confirm-modal__icon">
          {icon}
        </div>
        <div className="confirm-modal__content">
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      </div>
      <div className="confirm-modal__footer">
        {btns}
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;
