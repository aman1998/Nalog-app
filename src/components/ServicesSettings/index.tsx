import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { servicesFetchingSelector } from "store/services/selectors";
import { servicesRequest } from "store/services/reducers";
import { closeModal, } from "store/modals/reducers";
import { EModals } from "store/modals/types";

import { ELinks } from "../../config/types";

import ServiceModal from "../ServiceModal";
import { EServiceModalSteps } from "../ServiceModal/components/ServiceModalSteps/types";

import ServicesList from "./components/ServicesList";

const Tariffs: FC = () => {
  const { t } = useTranslation();
  const loading = useSelector(servicesFetchingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(servicesRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="settings-services">
      <h2 className="settings_title">{t(ELinks.SETTINGS_SERVICES)}</h2>
      {loading ? "Loading" : <ServicesList />}
      <ServiceModal
        startFrom={EServiceModalSteps.second}
        finalCall={() => dispatch(closeModal(EModals.activateServiceModal))}
      />
    </div>
  );
};

export default Tariffs;
