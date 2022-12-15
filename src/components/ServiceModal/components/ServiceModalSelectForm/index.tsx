import { Radio, Space } from "antd";
import { FC, useState } from "react";

import { TAX_REPORT_2021 } from "config/constants";

import ServiceModalSelectItem from "../ServiceModalSelectItem";

const ServiceModalSelect: FC = () => {
  const [value, setValue] = useState(TAX_REPORT_2021);

  return (
    <Radio.Group onChange={e => setValue(e.target.value)} value={value} className="service-modal-select">
      <Space direction="vertical">
        <ServiceModalSelectItem value={TAX_REPORT_2021} price={2900}/>
      </Space>
    </Radio.Group>
  );
};

export default ServiceModalSelect;
