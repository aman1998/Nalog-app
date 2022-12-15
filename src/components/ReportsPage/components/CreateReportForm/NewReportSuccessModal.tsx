import Modal from "antd/lib/modal";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";
import SuccessIcon from "components/Icons/SuccessIcon";

type TNewReportSuccessModalProps = {
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
};

const NewReportSuccessModal: FC<TNewReportSuccessModalProps> = ({ visible, onOk }) =>{
  const { t } = useTranslation();
  return (
    <Modal
      visible={visible}
      title={false}
      footer={false}
      onOk={onOk}
      onCancel={onOk}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      closeIcon={<></>}
      width={400}
    >
      <div className="assets-delete-modal__wrapper">
        <div className="assets-delete-modal__body">
          <div className="assets-delete-modal__icon">
            <SuccessIcon />
          </div>
          <div className="assets-delete-modal__content">
            <h4>{t("newReportSuccessModal.reportIsGenerating")}</h4>
            <p>{t("newReportSuccessModal.text")}</p>
          </div>
        </div>
        <div className="assets-delete-modal__footer">
          <Button title={t("naming.ok")} onClick={onOk} />
        </div>
      </div>
    </Modal>
  );};

export default NewReportSuccessModal;
