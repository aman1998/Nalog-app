import { FC } from 'react';
import { useTranslation } from "react-i18next";

import { ETariffPlan } from 'store/services/types';

import PlanAndPaymentSettingsTariff from './components/PlanAndPaymentSettingsTariff';
import PlanAndPaymentSettingsUnsubscribeModal from "./components/PlanAndPaymentSettingsUnsubscribeModal";
import PlanAndPaymentSettingsDeletePreOrderModal from './components/PlanAndPaymentSettingsDeletePreOrderModal';
import PlanAndPaymentSettingsPaymentMethod from "./components/PlanAndPaymentSettingsPaymentMethod";
import PlanAndPaymentSettingsPurchaseHistory from './components/PlanAndPaymentSettingsPurchaseHistory';
import PlanAndPaymentSettingsDeletePaymentMethodModal
  from "./components/PlanAndPaymentSettingsDeletePaymentMethodModal";

const PlanAndPaymentSettings: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="settings-plan-and-payment">
      <h2 className="settings_title">{t("planAndPayment.currentPlan")}</h2>
      <PlanAndPaymentSettingsTariff tariff={ETariffPlan.pro}/>
      <PlanAndPaymentSettingsTariff tariff={ETariffPlan.smart} renew={true}/>
      <PlanAndPaymentSettingsTariff tariff={ETariffPlan.smart} willBeActivate={true}/>
      <PlanAndPaymentSettingsTariff tariff={ETariffPlan.free}/>
      <PlanAndPaymentSettingsPaymentMethod/>
      <PlanAndPaymentSettingsPurchaseHistory/>

      {/*modals*/}
      <PlanAndPaymentSettingsUnsubscribeModal/>
      <PlanAndPaymentSettingsDeletePreOrderModal/>
      <PlanAndPaymentSettingsDeletePaymentMethodModal/>
    </div>
  );
};

export default PlanAndPaymentSettings;
