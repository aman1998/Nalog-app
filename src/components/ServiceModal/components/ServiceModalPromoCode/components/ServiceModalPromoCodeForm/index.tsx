import { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { TAX_REPORT_2021, YOOKASSA } from "config/constants";

import BNInput from "components/BNInput";
import Button from "components/Buttons/Button";

import {
  paymentCalculateDataSelector,
  paymentCalculateFailureSelector,
  paymentCalculateFetchingSelector,
} from "store/services/selectors";
import { calculatePaymentFailure, calculatePaymentRequest } from "store/services/reducers";
import { TPaymentCalculateOptions } from "store/services/types";

import { formatRubs } from "utils/fractions";

import { ActivateServicePromoCodeSchema } from "./validation";

const ServiceModalPromoCodeForm: FC = () => {
  const { t } = useTranslation();
  const calculateData = useSelector(paymentCalculateDataSelector);
  const parsedErrors = useSelector(paymentCalculateFailureSelector)?.parsedErrors;
  const loading = useSelector(paymentCalculateFetchingSelector);

  const dispatch = useDispatch();
  const initialValues: TPaymentCalculateOptions = {
    method: YOOKASSA,
    service_code: TAX_REPORT_2021,
  };

  const onSubmit = (values: TPaymentCalculateOptions) => {
    dispatch(calculatePaymentRequest(values));
  };

  const prices = (() => {
    if (!calculateData) {
      return <span className="service-modal-promo-form_prices_actual">{formatRubs(2900)}</span>;
    }

    if (calculateData.original_price === calculateData.price) {
      return <span className="service-modal-promo-form_prices_actual">{formatRubs(calculateData.original_price)}</span>;
    }

    return (
      <span>
        <span className="service-modal-promo-form_prices_not-relevant">
          {formatRubs(calculateData?.original_price)}
        </span>
        <span className="service-modal-promo-form_prices_actual">{formatRubs(calculateData?.price)}</span>
      </span>
    );
  })();

  useEffect(() => {
    dispatch(calculatePaymentRequest(initialValues));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ActivateServicePromoCodeSchema}>
      {({ setFieldValue, values }) => (
        <Form className="service-modal-promo-form">
          <div className="service-modal-promo-form_content">
            <BNInput
              type="text"
              name="promo_code"
              className="service-modal-promo-form_input"
              error={parsedErrors?.promo_code}
              label={t("naming.promoCode")}
              onFocus={() => dispatch(calculatePaymentFailure(null))}
              disabled={loading}
              onChange={e=>{
                const value = e.target.value || "";
                setFieldValue('promo_code', value.toLocaleUpperCase());
              }}
              value={values.promo_code}
            />
            <Button
              htmlType="submit"
              transparent={true}
              disabled={loading}
              title={t("action.apply")}
              className="service-modal-promo-form_submit-btm"
            />
          </div>
          <div className="service-modal-promo-form_prices">{t("naming.outcome")}: {prices}</div>
        </Form>
      )}
    </Formik>
  );
};

export default ServiceModalPromoCodeForm;
