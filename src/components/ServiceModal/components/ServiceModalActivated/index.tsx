import { FC } from "react";
import { useDispatch } from "react-redux";
import isFunction from "lodash/isFunction";
import { useTranslation } from "react-i18next";

import ServicesCard from "components/ServicesSettings/components/ServicesCard";
import Button from "components/Buttons/Button";

import { closeModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";

import { ServiceModalStepsProps } from "../../types";
import { useServiceModalFinalCall } from "../../index";

const ServiceModalActivated: FC<ServiceModalStepsProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const finalCall = useServiceModalFinalCall();

  const onClick = () => {
    if (isFunction(finalCall)) finalCall();
    dispatch(closeModal(EModals.activateServiceModal));
  };

  return (
    <div className="service-modal">
      <div className="service-modal_header">
        <h1 className="service-modal_title">{t("serviceModalActivated.title")}</h1>
      </div>
      <div className="service-modal_content">
        <ServicesCard
          className="service-modal-activated_card"
          title={t("naming.taxReturnFor", { year: 2021 })}
          description={t("serviceModalActivated.description")}
          connected={true}
        />
        <Button title={t("serviceModalActivated.toStep3")} className="service-modal_btn" onClick={onClick} />
      </div>
    </div>
  );
};

export default ServiceModalActivated;
