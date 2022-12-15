import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import SettingIcon from "components/Icons/SettingIcon";

import { toggleModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";
import { modalStateSelector } from "store/modals/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

const DashboardSymbolsSettingsIcon: FC = () => {
  const dispatch = useDispatch();
  const visible = useSelector(modalStateSelector(EModals.dashboardSymbolsSetSequence));
  
  const handleOpenModal = () => {
    dispatch(analyticEvent(EEventType.DASHBOARD_SYMBOLS_CONFIGURE));
    dispatch(toggleModal({ modal: EModals.dashboardSymbolsSetSequence, visible: !visible }));
  };
  
  return <div className="dashboard-symbols__setting" onClick={handleOpenModal}>
    <SettingIcon/>
  </div>;  
};

export default DashboardSymbolsSettingsIcon;