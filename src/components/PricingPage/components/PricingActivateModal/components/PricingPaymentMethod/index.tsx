import { FC, useState } from 'react';
import { Radio } from "antd";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";

const options = [
  {
    title: "MasterCard **** 0000, 04/28",
    value: "MasterCard **** 0000, 04/28"
  },
  {
    title: "Visa **** 0000, 04/28",
    value: "Visa **** 0000, 04/28"
  },
  {
    title: "New Pay Method",
    value: "New Pay Method"
  },
];

export type TPricingPaymentMethodProps = {
  onClick: () => void;
}

const PricingPaymentMethod: FC<TPricingPaymentMethodProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState();

  return (
    <>
      <Radio.Group
        onChange={e => setPaymentMethod(e.target.value)}
        value={paymentMethod}
      >
        {
          options.map(option => (
            <Radio key={option.value} value={option.value} className={"pricing__activate__radio"}>
              {option.title}
            </Radio>
          ))
        }
      </Radio.Group>
      <Button
        title={t("Оплатить 1990 ₽")}
        className="pricing__activate__btn"
        onClick={onClick}
      />
    </>
  );
};

export default PricingPaymentMethod;