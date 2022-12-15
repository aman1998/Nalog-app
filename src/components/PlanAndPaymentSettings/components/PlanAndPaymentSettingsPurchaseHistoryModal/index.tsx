import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import { Skeleton } from "antd";
import cn from "classnames";

import ModalWrapper from 'components/ModalWrapper';
import Button from "components/Buttons/Button";

import { modalStateSelector } from "store/modals/selectors";
import { EModals } from "store/modals/types";
import { closeModal } from "store/modals/reducers";
import { userPaymentHistoryRequest } from "store/user/reducers";
import { userPaymentHistorySelector } from "store/user/selectors";
import { TUserPaymentHistory } from "store/user/types";
import { IPaginationResponse } from "store/rootInterface";

import PlanAndPaymentSettingsPurchaseHistoryOption from "../PlanAndPaymentSettingsPurchaseHistoryOption";


const PlanAndPaymentSettingsPurchaseHistoryModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector(modalStateSelector(EModals.planAndPaymentPrePurchaseHistory));
  const data = useSelector(userPaymentHistorySelector);
  const userPaymentHistory = get(data, ["data"], []) as IPaginationResponse<TUserPaymentHistory>;
  const loading = get(data, ["fetching"], []) as boolean;
  const showMore = !!userPaymentHistory.next;
  const close = () => dispatch(closeModal(EModals.planAndPaymentPrePurchaseHistory));

  const loadMore = () => {
    dispatch(userPaymentHistoryRequest({ offset: userPaymentHistory?.next, limit: 20, loadMore: true }));
  };

  useEffect(() => {
    dispatch(userPaymentHistoryRequest({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ModalWrapper
    visible={!!visible}
    title={t("planAndPaymentSettings.purchaseHistory")}
    closeModal={close}
    onCancel={close}
    destroyOnClose={true}
    className="settings-plan-and-payment__purchase-history__options__modal"
  >
    <>
      {
        !!userPaymentHistory?.results.length && userPaymentHistory.results.map((option, index) => (
          <PlanAndPaymentSettingsPurchaseHistoryOption
            key={index}
            createdAt={option.created_at}
            description={option.description}
            amount={option.amount}
          />
        ))
      }
      {}
      {showMore && <div className="settings-plan-and-payment__purchase-history__show-more__wrapper">
        {loading
          ? (
            <Skeleton.Button
              active={true}
              size={"default"}
              className={cn("settings-plan-and-payment__purchase-history__show-more__skeleton")}
            />
          ) 
          : (
            <Button
              title={t("action.showMore")}
              className="settings-plan-and-payment__purchase-history__show-more"
              onClick={loadMore}
              disabled={loading}
            />
          )
        }
      </div>}
    </>
  </ModalWrapper>;
};

export default PlanAndPaymentSettingsPurchaseHistoryModal;