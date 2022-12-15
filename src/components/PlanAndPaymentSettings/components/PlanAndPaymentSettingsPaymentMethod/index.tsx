import { FC, useEffect, useState } from 'react';
import { Radio } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { QUERIES } from "config/constants";

import PlusIcon from 'components/Icons/PlusIcon';
import Button from "components/Buttons/Button";

import {
  newUserPaymentMethodsRequest,
  setUserPaymentMethodsRequest,
  userPaymentMethodsRequest
} from 'store/user/reducers';
import {
  deleteUserPaymentMethodSelector,
  setUserPaymentMethodSelector,
  userPaymentMethodsSelector
} from 'store/user/selectors';
import { openModal } from 'store/modals/reducers';
import { EModals } from "store/modals/types";

const PlanAndPaymentSettingsPaymentMethod: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<string>("");
  const { data: userPaymentMethods, fetching: fetchingUserPaymentMethods } = useSelector(userPaymentMethodsSelector);
  const { fetching: deleteUserPaymentMethod } = useSelector(deleteUserPaymentMethodSelector);
  const { fetching: setUserPaymentMethod } = useSelector(setUserPaymentMethodSelector);
  const disable = deleteUserPaymentMethod || fetchingUserPaymentMethods || setUserPaymentMethod;

  const onAddCardHandler = () => {
    dispatch(newUserPaymentMethodsRequest({}));
  };

  const onDeleteCardHandler = (id: string, name: string) => {
    dispatch(openModal(EModals.planAndPaymentDeletePaymentMethod));
    history.replace({
      search: `?${QUERIES.id}=${id}&${QUERIES.title}=${name}`
    });
  };

  const onClickPaymentMethodHandler = (id: string) => {
    dispatch(setUserPaymentMethodsRequest({ id }));
  };

  useEffect(() => {
    dispatch(userPaymentMethodsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(userPaymentMethods && userPaymentMethods.length) {
      const $defaultPaymentMethod = userPaymentMethods.find(item => item.is_default) || userPaymentMethods[0];
      setDefaultPaymentMethod($defaultPaymentMethod.id);
    }
  }, [userPaymentMethods]);

  return <div className="settings-plan-and-payment__payment-method">
    <div className="settings-plan-and-payment__payment-method__title">
      {t("pricing.paymentMethod")}
    </div>
    <Radio.Group
      onChange={e => setDefaultPaymentMethod(e.target.value)}
      value={defaultPaymentMethod}
      className="settings-plan-and-payment__payment-method__radio-group"
      disabled={disable}
    >
      {
        userPaymentMethods && userPaymentMethods.map(paymentMethod => (
          <Radio
            key={paymentMethod.id}
            value={paymentMethod.id}
            className="settings-plan-and-payment__payment-method__radio"
            onClick={() => onClickPaymentMethodHandler(paymentMethod.id)}
          >
            <span className="settings-plan-and-payment__payment-method__radio__title">{paymentMethod.name}</span>
            <Button
              title={t("action.delete")}
              transparent={true}
              onClick={e => {
                e.stopPropagation();
                onDeleteCardHandler(paymentMethod.id, paymentMethod.name);
              }}
              className="settings-plan-and-payment__payment-method__radio__delete"
            />
          </Radio>
        ))
      }
    </Radio.Group>
    <div className="settings-plan-and-payment__payment-method__add-card__wrapper">
      <Button
        disabled={disable}
        title={t("planAndPaymentSettings.addCard")}
        onClick={onAddCardHandler}
        icon={<PlusIcon/>}
        transparent={true}
        className={cn("settings-plan-and-payment__payment-method__add-card", {
          "no-options": !userPaymentMethods?.length })
        }
      />
    </div>
  </div>;
};

export default PlanAndPaymentSettingsPaymentMethod;