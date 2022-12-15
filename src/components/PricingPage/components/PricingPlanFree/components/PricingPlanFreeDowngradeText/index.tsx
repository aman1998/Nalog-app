import { FC } from 'react';
import { useTranslation } from "react-i18next";

const PricingPlanFreeDowngradeText: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="pricing__card__downgrade-text">
      {t("pricing.downgradeText")}
    </div>
  );
};

export default PricingPlanFreeDowngradeText;