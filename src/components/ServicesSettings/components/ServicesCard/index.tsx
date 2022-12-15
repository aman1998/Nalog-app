import { FC } from "react";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { EServiceModalSteps } from "components/ServiceModal/components/ServiceModalSteps/types";

import { ESettingsServicesStatus } from "store/services/types";

import { ServicesCardProps } from "./types";

const ServicesCard: FC<ServicesCardProps> = ({ title, description, connected, state, className }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const onClick = () => {
    if (!connected && state === ESettingsServicesStatus.available) {
      history.push({ search: `?modal=${EServiceModalSteps.second}` });
    }
  };

  const formState = (() => {
    if (connected) {
      return t("serviceCard.connected");
    }
    switch (state) {
    case ESettingsServicesStatus.available:
      return t("serviceCard.toPlug");
    case ESettingsServicesStatus.soon:
      return t("serviceCard.soon");
    case ESettingsServicesStatus.archived:
      return t("serviceCard.archived");
    }
  })();

  return (
    <div onClick={onClick} className={cn("settings-services-card", { connected }, className)}>
      <div className="settings-services-card__title">{title}</div>
      <div className="settings-services-card__container">
        <div className="settings-services-card__description">{description}</div>
        <button className={cn("settings-services-card__state", { connected })}>{formState}</button>
      </div>
    </div>
  );
};

export default ServicesCard;
