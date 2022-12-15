import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { servicesDataSelector } from "store/services/selectors";

import ServicesCard from "../ServicesCard";

const ServicesList: FC = () => {
  const { t } = useTranslation();
  const data = useSelector(servicesDataSelector);

  return (
    <>
      {data?.map(service => (
        <ServicesCard
          key={service.id}
          title={service.name}
          description={t("serviceModal.description")}
          connected={service.connected}
          state={service.state}
        />
      ))}
    </>
  );
};

export default ServicesList;
