import { FC } from 'react';
import moment from "moment";

import { TNullable } from "config/types";

export type TPlanAndPaymentSettingsPurchaseHistoryOptionProps = {
  createdAt: TNullable<string>;
  description: string;
  amount: string;
}
const PlanAndPaymentSettingsPurchaseHistoryOption: FC<TPlanAndPaymentSettingsPurchaseHistoryOptionProps> = ({
  createdAt, description, amount
}) => (
  <div className="settings-plan-and-payment__purchase-history__option">
    <div>
      <span>{moment(createdAt).format("DD.MM.YYYY")}</span>
      <span>{description}</span>
    </div>
    <span>{amount || 0}</span>
  </div>
);

export default PlanAndPaymentSettingsPurchaseHistoryOption;