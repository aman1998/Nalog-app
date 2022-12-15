import { FC } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { QUERIES } from "config/constants";

import ConfirmModal from "components/ConfirmModal";
import DangerIcon from "components/Icons/DangerIcon";
import Button from "components/Buttons/Button";

import useQuery from "hooks/useQuery";

import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import { closeModal } from "store/modals/reducers";
import { deleteUserPaymentMethodsRequest } from "store/user/reducers";

const PlanAndPaymentSettingsDeletePaymentMethodModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const visible = useSelector(modalStateSelector(EModals.planAndPaymentDeletePaymentMethod));
  const query = useQuery();
  const id = query.get(QUERIES.id);
  const title = query.get(QUERIES.title);

  const close = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete(QUERIES.id);
    queryParams.delete(QUERIES.title);
    history.replace({
      search: queryParams.toString(),
    });
    dispatch(closeModal(EModals.planAndPaymentDeletePaymentMethod));
  };

  const handleDelete = () => {
    dispatch(deleteUserPaymentMethodsRequest({ id }));
    close();
  };

  return <ConfirmModal
    icon={<DangerIcon />}
    btns={
      <>
        <Button title={t("action.cancel")} transparent={true} onClick={close} />
        <Button
          title={t('action.delete')}
          danger={true}
          onClick={handleDelete}
        />
      </>
    }
    onCancel={close}
    title={title || ""}
    text={t("planAndPaymentSettings.sureToDeletePaymentMethod")}
    visible={!!visible}
  />;
};

export default PlanAndPaymentSettingsDeletePaymentMethodModal;