import { FC } from "react";
import isFunction from "lodash/isFunction";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";

import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { ServiceModalStepsProps } from "../../types";

import ServiceModalSelectForm from "../ServiceModalSelectForm";
import { EServiceModalSteps } from "../ServiceModalSteps/types";

const ServiceModalSelect: FC<ServiceModalStepsProps> = ({ setStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClickHandler = () => {
    if (isFunction(setStep)) setStep(EServiceModalSteps.second);
    dispatch(analyticEvent(EEventType.TAXREPORT_STEP2_PAYMENT_STARTED));
  };
  
  return (
    <div className="service-modal">
      <div className="service-modal_header">
        <h1 className="service-modal_title">{t("naming.serviceActivation")}</h1>
        <div className="service-modal_sub-title">{t("serviceModal.serviceSelection")}</div>
      </div>

      <div className="service-modal_content">
        <div className="service-modal_description">
          {t("serviceModal.selectText")}
        </div>
        <ServiceModalSelectForm />
        <Button
          title={t("action.proceed")}
          className="service-modal_btn"
          onClick={onClickHandler}
        />
      </div>
    </div>
  );
};

export default ServiceModalSelect;
