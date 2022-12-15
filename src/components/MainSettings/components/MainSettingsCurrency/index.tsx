import { FC } from 'react';
import { useField } from "formik";

import { ECurrency } from "config/types";

import DropdownSelector from 'components/DropdownSelector';
import CryptoIcon from "components/CryptoIcon";

const MainSettingsCurrency: FC = () => {
  const [, meta, helpers] = useField("currency");
  const { setValue } = helpers;
  const { value } = meta;

  const options = [
    {
      label: ECurrency.usd,
      value: ECurrency.usd,
      icon: () => <CryptoIcon asset={ECurrency.usd}/>
    },
    {
      label: ECurrency.rub,
      value: ECurrency.rub,
      icon: () => <CryptoIcon asset={ECurrency.rub}/>
    }
  ];
  return (
    <div className="settings-main__currency  settings__item__row">
      <DropdownSelector
        value={value}
        options={options} className="settings-main__currency__select"
        onSelect={setValue}
      />
    </div>
  );
};

export default MainSettingsCurrency;