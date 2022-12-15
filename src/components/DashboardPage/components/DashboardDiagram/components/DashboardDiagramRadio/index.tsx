import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RadioChangeEvent } from "antd";

import Radio from "components/Radio";

import { DashboardDiagramKeys } from "store/assets/types";
import {
  dashboardDiagramKeyValuesSelector,
  dashboardDiagramSelectedSelector,
} from "store/assets/selectors";
import { setDashboardDiagramSelected } from "store/assets/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

const DashboardDiagramRadio: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selected = useSelector(dashboardDiagramSelectedSelector);
  const accounts = useSelector(dashboardDiagramKeyValuesSelector(DashboardDiagramKeys.accounts));
  const assets = useSelector(dashboardDiagramKeyValuesSelector(DashboardDiagramKeys.assets));

  const handleOnChange = (e: RadioChangeEvent) => {
    dispatch(setDashboardDiagramSelected(e.target.value));
    if (e.target.value === DashboardDiagramKeys.assets) {
      dispatch(analyticEvent(EEventType.DASHBOARD_DISTRIBUTION_SHOW_ASSETS));
    } else {
      dispatch(analyticEvent(EEventType.DASHBOARD_DISTRIBUTION_SHOW_EXCHANGE));
    }
  };

  return (
    <div className="dashboard-diagram-radio" >
      <Radio
        options={[
          {
            label: t('naming.cryptoAssets'),
            value: DashboardDiagramKeys.assets, disabled: !assets.length && !!accounts.length
          },
          {
            label: t('naming.exchanges'),
            value: DashboardDiagramKeys.accounts, disabled: !accounts.length },
        ]}
        value={selected}
        optionType="button"
        onChange={handleOnChange}
      />
    </div>
  );};

export default DashboardDiagramRadio;