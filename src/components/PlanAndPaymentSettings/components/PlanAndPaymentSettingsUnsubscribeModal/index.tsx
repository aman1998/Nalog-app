import { FC } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/Buttons/Button";
import ConfirmModal from "components/ConfirmModal";
import DangerIcon from "components/Icons/DangerIcon";

import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import { closeModal } from "store/modals/reducers";

const PlanAndPaymentSettingsUnsubscribeModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector(modalStateSelector(EModals.planAndPaymentUnsubscribe));

  const close = () => {
    dispatch(closeModal(EModals.planAndPaymentUnsubscribe));
  };

  return <ConfirmModal
    icon={<DangerIcon />}
    btns={
      <>
        <Button title={t("action.cancel")} transparent={true} onClick={close} />
        <Button
          title={t('planAndPaymentSettings.unsubscribe')}
          onClick={close}
          danger={true}
        />
      </>
    }
    onCancel={close}
    title={t("planAndPaymentSettings.unsubscribe")}
    text={t("Are you sure to unsubscribe. And Some text")}
    visible={!!visible}
  />;
};

export default PlanAndPaymentSettingsUnsubscribeModal;