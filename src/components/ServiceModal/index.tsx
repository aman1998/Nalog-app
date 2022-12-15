import { createContext, FC, useContext, useEffect, useState } from "react";
import { Modal as AntdModal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import useQuery from "hooks/useQuery";

import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import { closeModal, toggleModal } from "store/modals/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import ServiceModalSteps from "./components/ServiceModalSteps";
import { EServiceModalSteps } from "./components/ServiceModalSteps/types";
import { ServiceModalProps, TServiceModalFinalCall, TServiceModalStartFrom } from "./types";

const ServiceModalFinalCallContext = createContext<TServiceModalFinalCall>(undefined);
const ServiceModalStartFromContext = createContext<TServiceModalStartFrom>(EServiceModalSteps.first);

export const useServiceModalFinalCall = (): TServiceModalFinalCall => useContext(ServiceModalFinalCallContext);

export const useServiceModalStartFrom = (): TServiceModalStartFrom => useContext(ServiceModalStartFromContext);

const ServiceModal: FC<ServiceModalProps> = ({ finalCall, startFrom }) => {
  const visible = useSelector(modalStateSelector(EModals.activateServiceModal));
  const [activeStep, setActiveStep] = useState<EServiceModalSteps>(EServiceModalSteps.first);
  const dispatch = useDispatch();
  const query = useQuery();
  const modal = query.get("modal") as (EServiceModalSteps | null);
  const history = useHistory();

  const handleClose = () => {
    dispatch(closeModal(EModals.activateServiceModal));
    setActiveStep(EServiceModalSteps.first);
    history.push({
      search: "",
    });
  };

  const handleCancel = () => {
    dispatch(analyticEvent(EEventType.TAXREPORT_STEP2_PAYMENT_CANCELED));
    handleClose();
  };

  useEffect(() => {
    if (modal) {
      dispatch(toggleModal({ modal: EModals.activateServiceModal, visible: !!modal }));
      setActiveStep(modal);
    } else {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  return (
    <AntdModal
      centered={true}
      title={false}
      visible={visible}
      footer={false}
      onCancel={handleCancel}
      width={636}
      destroyOnClose={true}
    >
      <ServiceModalFinalCallContext.Provider value={finalCall}>
        <ServiceModalStartFromContext.Provider value={startFrom}>
          <ServiceModalSteps activeStep={activeStep} setActiveStep={setActiveStep} />
        </ServiceModalStartFromContext.Provider>
      </ServiceModalFinalCallContext.Provider>
    </AntdModal>
  );
};

export default ServiceModal;
