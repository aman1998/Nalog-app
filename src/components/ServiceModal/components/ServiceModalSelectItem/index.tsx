import { Radio } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { formatRubs } from "utils/fractions";

import { ServiceModalSelectItemProps } from "./types";

const ServiceModalSelectItem: FC<ServiceModalSelectItemProps> = ({ value, price }) => {
  const { t } = useTranslation();
  return (
    <Radio value={value} className="service-modal-select-item">
      <h6 className="service-modal-select-item_header">{t("naming.taxReturnFor", { year: 2021 })}</h6>
      <div className="service-modal-select-item_content">
        <p className="service-modal-select-item_description">
          {t("serviceModal.description")}
        </p>
        <div className="service-modal-select-item_price">{formatRubs(price)}</div>
      </div>
    </Radio>
  );};

export default ServiceModalSelectItem;
