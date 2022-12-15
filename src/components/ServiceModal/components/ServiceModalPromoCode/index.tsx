import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import { TAX_REPORT_2021, YOOKASSA } from "config/constants";

import Button from "components/Buttons/Button";
import VectorArrowIcon from "components/Icons/VectorArrowIcon";

import {
  paymentCalculateDataSelector,
  paymentCalculateFetchingSelector,
  paymentCalculateOptionsSelector,
  paymentFetchingSelector,
} from "store/services/selectors";
import { paymentRequest } from "store/services/reducers";

import { ServiceModalStepsProps } from "../../types";
import { useServiceModalStartFrom } from "../../index";

import { EServiceModalSteps } from "../ServiceModalSteps/types";

import ServiceModalPromoCodeForm from "./components/ServiceModalPromoCodeForm";

const ServiceModalPromoCode: FC<ServiceModalStepsProps> = ({ setStep }) => {
  const { t } = useTranslation();
  const paymentLoading = useSelector(paymentFetchingSelector);
  const paymentCalculateLoading = useSelector(paymentCalculateFetchingSelector);
  const paymentCalculateOptions = useSelector(paymentCalculateOptionsSelector);
  const paymentCalculateData = useSelector(paymentCalculateDataSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const startFrom = useServiceModalStartFrom();

  const paymentInitialPrice = 1900;

  const onClick = () => {
    const data = {
      promo_code: paymentCalculateOptions?.promo_code,
      amount: paymentCalculateData?.price ? paymentCalculateData?.price : paymentInitialPrice,
      method: YOOKASSA,
      service_code: TAX_REPORT_2021,
      url_pending: `${location.pathname}?modal=${EServiceModalSteps.second}`,
      url_canceled: `${location.pathname}?modal=${EServiceModalSteps.second}`,
      url_completed: `${location.pathname}?modal=${EServiceModalSteps.third}`,
    };
    dispatch(paymentRequest(data));
  };

  const showGoBack = startFrom === EServiceModalSteps.first;

  return (
    <div className="service-modal">
      <div className="service-modal_header">
        {showGoBack && (
          <div className="service-modal_go-back" onClick={() => setStep && setStep(EServiceModalSteps.first)}>
            <VectorArrowIcon />
          </div>)
        }
        <h1 className="service-modal_title">{t("naming.serviceActivation")}</h1>
      </div>

      <div className="service-modal_content">
        <div className="service-modal-selected">
          <h6 className="service-modal-selected_header">{t("naming.taxReturnFor", { year: 2021 })}</h6>
          <p className="service-modal-selected_description">
            {t("serviceModal.description")}
          </p>
        </div>
        <ServiceModalPromoCodeForm />
        <Button
          title={t("serviceModal.toPay")}
          className="service-modal_btn"
          onClick={onClick}
          disabled={paymentCalculateLoading || paymentLoading}
          loading={paymentLoading}
        />
      </div>
    </div>
  );
};

export default ServiceModalPromoCode;
