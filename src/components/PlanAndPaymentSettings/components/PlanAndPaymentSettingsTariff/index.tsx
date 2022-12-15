import { FC } from 'react';
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { paths } from "config/paths";
import { colors, mobileMediaWidth } from "config/constants";

import ProgressInfo from "components/ProgressInfo";
import Button from 'components/Buttons/Button';
import CloseCircleIcon from "components/Icons/CloseCircleIcon";

import { openModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";
import { ETariffPlan } from 'store/services/types';

import PlanAndPaymentSettingsTariffMenu from "../PlanAndPaymentSettingsTariffMenu";

export type TPlanAndPaymentSettingsTariffProps = {
  tariff: ETariffPlan,
  renew?: boolean
  willBeActivate?: boolean
}

const PlanAndPaymentSettingsTariff: FC<TPlanAndPaymentSettingsTariffProps> = ({ tariff, renew, willBeActivate }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileMediaWidth}px)` });

  const formTitle = () => {
    switch (tariff) {
    case ETariffPlan.free:
      return t("planAndPaymentSettings.newbiePlan");
    case ETariffPlan.smart:
      return t("planAndPaymentSettings.smartPlan");
    case ETariffPlan.pro:
      return t("planAndPaymentSettings.proPlan");
    }
  };

  const formExpiration = () => {
    if (willBeActivate) {
      return t("planAndPaymentSettings.willBeActivatedOn") +  " Apr 21, 2023";
    }
    if (renew) {
      return t("planAndPaymentSettings.renewsAutomaticallyOn") +  " Apr 20, 2023";
    }
    return t("planAndPaymentSettings.until")  + " Apr 20, 2023";
  };
  
  const onClickUpgrade = () => {
    history.push(paths.PRICING);
  };
  
  return (
    <div className="settings-plan-and-payment__tariff">
      <div className={cn("settings-plan-and-payment__tariff__inner-wrapper", { "will-be-activate": willBeActivate })}>
        <div className="settings-plan-and-payment__tariff__title">
          {formTitle()}
        </div>
        <div className="settings-plan-and-payment__tariff__expiration-date">
          {formExpiration()}
        </div>
        <div className="settings-plan-and-payment__tariff__progress">
          <ProgressInfo
            title={t("pricing.fileStorage")}
            number={50}
            max={100}
            unit={"MB"}
          />
          <ProgressInfo
            title={t("pricing.notesAndTags")}
            number={12}
            max={25}
            noLimit={true}
          />
        </div>
      </div>
      {!willBeActivate && <PlanAndPaymentSettingsTariffMenu/>}
      {(tariff !== ETariffPlan.pro && !willBeActivate && !isMobile) && <Button
        className="settings-plan-and-payment__tariff__upgrade-btn"
        title="Upgrade"
        lettuce={true}
        onClick={onClickUpgrade}
      />}
      {!isMobile && willBeActivate && <Button
        className="settings-plan-and-payment__tariff__will-be-activate-btn"
        title="Delete"
        onClick={() => dispatch(openModal(EModals.planAndPaymentPreOrderDelete))}
        transparent={true}
      />}
      {isMobile && willBeActivate && <CloseCircleIcon
        fill={colors.gray5}
        className="settings-plan-and-payment__tariff__will-be-activate-close-icon"
        onClick={() => dispatch(openModal(EModals.planAndPaymentPreOrderDelete))}
      />}
    </div>
  );
};

export default PlanAndPaymentSettingsTariff;