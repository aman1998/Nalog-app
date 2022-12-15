import { FC, useState } from 'react';
import { Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { colors } from "config/constants";
import { paths } from "config/paths";

import EllipsisVerticalIcon from "components/Icons/EllipsisVerticalIcon";

import { openModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";


const PlanAndPaymentSettingsTariffMenu: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [active, setActive] = useState(false);

  const onClickUnsubscribe = () => {
    dispatch(openModal(EModals.planAndPaymentUnsubscribe));
  };

  const menu = (
    <Menu className="settings-plan-and-payment__tariff__menu">
      <Menu.Item
        key="1"
        onClick={onClickUnsubscribe}
        className="settings-plan-and-payment__tariff__menu__unsubscribe"
      >
        {t("planAndPaymentSettings.unsubscribe")}
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => history.push(paths.PRICING)}
      >
        {t("planAndPaymentSettings.aboutPlan")}
      </Menu.Item>
      <Menu.Item
        key="3"
      >
        {t("planAndPaymentSettings.FAQ")}
      </Menu.Item>
    </Menu>
  );
  
  return <div className="settings-plan-and-payment__tariff__dropdown">
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      placement="bottomRight"
      onVisibleChange={$active => setActive($active)}
      align={{ offset: [-36, -44] }}
    >
      <a onClick={e => e.preventDefault()}>
        <EllipsisVerticalIcon color={active ? colors.main : colors.gray6}/>
      </a>
    </Dropdown>
  </div>;
};

export default PlanAndPaymentSettingsTariffMenu;