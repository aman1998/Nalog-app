import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import { QUERIES } from "config/constants";

import ModalWrapper from "components/ModalWrapper";

import useQuery from "hooks/useQuery";

import { closeModal, openModal } from 'store/modals/reducers';
import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import { ETariffPlan } from 'store/services/types';

import PricingActivatePlan from './components/PricingActivatePlan';
import PricingPaymentMethod from './components/PricingPaymentMethod';

export enum EPricingActivateModalSteps {
  one = 1,
  two = 2
}

const PricingActivateModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const visible = useSelector(modalStateSelector(EModals.activatePricing));
  const query = useQuery();
  const modal = query.get(QUERIES.modal);
  const pricing = query.get(QUERIES.pricing) as ETariffPlan;

  const [step, setStep] = useState<EPricingActivateModalSteps>(EPricingActivateModalSteps.one);

  const closeModalHandle = () => {
    setStep(EPricingActivateModalSteps.two);
    dispatch(closeModal(EModals.activatePricing));
    query.delete(QUERIES.modal);
    query.delete(QUERIES.pricing);
    query.delete(QUERIES.plan);
    history.replace({
      search: query.toString(),
    });
  };
  
  const handleBack = () => setStep(EPricingActivateModalSteps.one);

  const formTitle = () => {
    switch (pricing) {
    case ETariffPlan.smart:
      return t("pricing.activatingSmartPlan");
    case ETariffPlan.pro:
      return t("pricing.paymentMethod");
    default:
      return "";
    }
  };

  useEffect(() => {
    if (modal === EModals.activatePricing) {
      dispatch(openModal(EModals.activatePricing));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  return <ModalWrapper
    visible={!!visible}
    title={formTitle()}
    closeModal={closeModalHandle}
    handleBack={step !== EPricingActivateModalSteps.one && handleBack}
    className="pricing__activate__modal"
    destroyOnClose={true}
    width={636}
  >
    <div className="pricing__activate">
      {
        step === EPricingActivateModalSteps.one
          ? <PricingActivatePlan setStep={setStep} />
          : <PricingPaymentMethod onClick={closeModalHandle}/>
      }
    </div>
  </ModalWrapper>;
};

export default PricingActivateModal;