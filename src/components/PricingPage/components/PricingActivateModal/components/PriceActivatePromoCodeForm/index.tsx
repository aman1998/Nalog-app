import { FC } from 'react';
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import BNInput from "components/BNInput";
import Button from "components/Buttons/Button";

export type TPriceActivatePromoCodeFormValues = {
  promo_code: string;
}

const PriceActivatePromoCodeForm: FC = () => {
  const { t } = useTranslation();
  const initialValues = {
    promo_code: ""
  };

  // eslint-disable-next-line arrow-body-style
  const onSubmit = () => {
    return;
  };

  return (
    <Formik<TPriceActivatePromoCodeFormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="pricing__activate-promo-code-form">
          <div className="pricing__activate-promo-code-form__content">
            <BNInput
              type="text"
              name="promo_code"
              className="pricing__activate-promo-code-form__input"
              label={t("naming.promoCode")}
              onChange={e => {
                const value = e.target.value || "";
                setFieldValue('promo_code', value.toLocaleUpperCase());
              }}
              value={values.promo_code}
            />
            <Button
              htmlType="submit"
              transparent={true}
              title={t("action.apply")}
              className="pricing__activate-promo-code-form__btn"
            />
          </div>
          <div className="pricing__activate-promo-code-form__prices">
            {t("naming.outcome")}:
            <span className="pricing__activate-promo-code-form__prices__actual">990 ₽</span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PriceActivatePromoCodeForm;