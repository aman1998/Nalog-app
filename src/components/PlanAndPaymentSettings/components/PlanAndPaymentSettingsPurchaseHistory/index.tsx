import { FC, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import { Empty } from "antd";

import Button from "components/Buttons/Button";

import { openModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";
import { userPaymentHistorySelector } from "store/user/selectors";
import { userPaymentHistoryRequest } from "store/user/reducers";
import { TUserPaymentHistory } from "store/user/types";
import { modalStateSelector } from "store/modals/selectors";
import { IPaginationResponse } from "store/rootInterface";

import PlanAndPaymentSettingsPurchaseHistoryModal from "../PlanAndPaymentSettingsPurchaseHistoryModal";
import PlanAndPaymentSettingsPurchaseHistoryOption from '../PlanAndPaymentSettingsPurchaseHistoryOption';

const PURCHASE_HISTORY_LIMIT = 3;

const PlanAndPaymentSettingsPurchaseHistory: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector(userPaymentHistorySelector);
  const visible = useSelector(modalStateSelector(EModals.planAndPaymentPrePurchaseHistory));
  const userPaymentHistoryResponse = get(data, ["data"], []) as IPaginationResponse<TUserPaymentHistory>;
  const userPaymentHistory = get(userPaymentHistoryResponse, ["results"], []);

  const showMore = !!userPaymentHistory?.length
    && (userPaymentHistoryResponse.next || userPaymentHistoryResponse.results.length > PURCHASE_HISTORY_LIMIT);

  useEffect(() => {
    if (!userPaymentHistory?.length) {
      dispatch(userPaymentHistoryRequest({ limit: PURCHASE_HISTORY_LIMIT }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="settings-plan-and-payment__purchase-history">
      <div className="settings-plan-and-payment__purchase-history__title">
        {t("planAndPaymentSettings.purchaseHistory")}
      </div>
      <div className="settings-plan-and-payment__purchase-history__options">
        {
          !!userPaymentHistory?.length 
            ? userPaymentHistory.slice(0, PURCHASE_HISTORY_LIMIT).map((option, index) => (
              <PlanAndPaymentSettingsPurchaseHistoryOption
                key={index}
                createdAt={option.created_at}
                description={option.description}
                amount={option.amount}
              />
            ))
            : (
              <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>{t("naming.noData")}</span>} />
              </div>
            )
        }
      </div>
      {showMore && (
        <div className="settings-plan-and-payment__purchase-history__see-all__wrapper">
          <Button
            title={t("planAndPaymentSettings.seeAll")}
            transparent={true}
            className="settings-plan-and-payment__purchase-history__see-all"
            onClick={() => dispatch(openModal(EModals.planAndPaymentPrePurchaseHistory))}
          />
        </div>
      )}
      {(showMore && visible) && <PlanAndPaymentSettingsPurchaseHistoryModal/>}
    </div>
  );
};

export default PlanAndPaymentSettingsPurchaseHistory;