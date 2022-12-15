import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ModalWrapper from 'components/ModalWrapper';

import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import { closeModal } from "store/modals/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import DashboardSymbolsSetSequenceForm from "./components/DashboardSymbolsSetSequenceForm";

const DashboardSymbolsSetSequenceModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector(modalStateSelector(EModals.dashboardSymbolsSetSequence));

  const handleCloseModal = () => {
    dispatch(analyticEvent(EEventType.DASHBOARD_SYMBOLS_CLOSE_CONFIG));
    dispatch(closeModal(EModals.dashboardSymbolsSetSequence));
  };

  return (
    <ModalWrapper
      visible={!!visible}
      closeModal={handleCloseModal}
      title={t("dashboardSymbolsSetSequenceModal.title")}
      destroyOnClose={true}
      className="dashboard-symbols-set-sequence-modal"
      width={636}
    >
      <DashboardSymbolsSetSequenceForm/>
    </ModalWrapper>
  );
};

export default DashboardSymbolsSetSequenceModal;