import { FC } from "react";
import Modal from "antd/lib/modal";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";
import InfoIcon from "components/Icons/InfoIcon";

type TNewReportDraftModalProps = {
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
};

const NewReportDraftModal: FC<TNewReportDraftModalProps> = ({ visible, onOk, onCancel }) => {
  const { t } = useTranslation();
  return (
    <Modal
      visible={visible}
      title={false}
      footer={false}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      closeIcon={<></>}
      width={400}
    >
      <div className="assets-delete-modal__wrapper">
        <div className="assets-delete-modal__body">
          <div className="assets-delete-modal__icon">
            <InfoIcon />
          </div>
          <div className="assets-delete-modal__content">
            <h4>{t("newReportDraftModal.title")}</h4>
            <p>{t("newReportDraftModal.text")}</p>
          </div>
        </div>
        <div className="assets-delete-modal__footer">
          <Button title={t("action.close")} transparent={true} onClick={onCancel} />
          <Button title={t("action.saveToDraft")} onClick={onOk} />
        </div>
      </div>
    </Modal>
  );};

export default NewReportDraftModal;
