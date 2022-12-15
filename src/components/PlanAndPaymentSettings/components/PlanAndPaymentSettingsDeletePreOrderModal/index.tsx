import { FC } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/Buttons/Button";
import DangerIcon from "components/Icons/DangerIcon";
import ConfirmModal from "components/ConfirmModal";

import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import { closeModal } from "store/modals/reducers";

const PlanAndPaymentSettingsDeletePreOrderModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector(modalStateSelector(EModals.planAndPaymentPreOrderDelete));

  const close = () => {
    dispatch(closeModal(EModals.planAndPaymentPreOrderDelete));
  };
  
  return <ConfirmModal
    icon={<DangerIcon />}
    btns={
      <>
        <Button title={t("action.cancel")} transparent={true} onClick={close} />
        <Button
          title={t('action.delete')}
          danger={true}
          onClick={close}
        />
      </>
    }
    onCancel={close}
    title={t("planAndPaymentSettings.deletePreorder")}
    text={t("planAndPaymentSettings.sureToDeletePreorder")}
    visible={!!visible}
  />;
};

export default PlanAndPaymentSettingsDeletePreOrderModal;