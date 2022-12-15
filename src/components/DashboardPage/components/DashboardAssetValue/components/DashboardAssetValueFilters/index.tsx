import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

import { maxMobileMediaWidth } from "config/constants";

import RangeDatePicker from "components/RangeDatePicker";

import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { ACTIONS, EFilterTubs } from "../../types";
import { useDashboardAssetValue } from "../../context";

import { getFilterTubs } from "./constants";
import { TFilterTub } from "./types";

const DashboardAssetValueFilters: FC = () => {
  const { t } = useTranslation();
  const dispatch= useDispatch();
  const { localState, localDispatch } = useDashboardAssetValue();
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });

  const handleDatePicker = (value: RangeValue<Moment>) => {
    if (!localDispatch) return;

    if (value?.length && value.length > 1 && value[0] && value[1]) {
      dispatch(analyticEvent(EEventType.DASHBOARD_ASSETS_VALUE_SHOW_CUSTOM_PERIOD));
      localDispatch({ type: ACTIONS.SET_DATE_RANGE, payload: [value[0], value[1]] });
    } else if (!value) {
      localDispatch({ type: ACTIONS.SET_DATE_RANGE, payload: null });
    }
  };

  const handlerOnClickFilter = (filterTub: TFilterTub) => {
    if (localDispatch) localDispatch({ type: ACTIONS.SET_FIXED_DATE, payload: filterTub.value });
    switch (filterTub.value) {
    case EFilterTubs.sevenDays:
      dispatch(analyticEvent(EEventType.DASHBOARD_ASSETS_VALUE_SHOW_7_DAYS));
      break;
    case EFilterTubs.thirtyDays:
      dispatch(analyticEvent(EEventType.DASHBOARD_ASSETS_VALUE_SHOW_30_DAYS));
      break;
    case EFilterTubs.twoZeroTwentyTwo:
      dispatch(analyticEvent(EEventType.DASHBOARD_ASSETS_VALUE_SHOW_2022));
      break;
    case EFilterTubs.twoZeroTwentyOne:
      dispatch(analyticEvent(EEventType.DASHBOARD_ASSETS_VALUE_SHOW_2021));
      break;
    }
  };

  return (
    <div className="dashboard-assets-value__filters">
      {!isMobile && <RangeDatePicker
        onChange={handleDatePicker}
        placeholder={[t('date.from'), t('date.to')]}
        className="dashboard-assets-value__filters__datepicker"
        value={localState.dateRange}
      />}
      <div className="dashboard-assets-value__filters__tabs">
        {getFilterTubs(t).map(item => <div
          key={item.value}
          className={cn("dashboard-assets-value__filters__tab", { active: item.value === localState.fixedDate })}
          onClick={() => handlerOnClickFilter(item)}
        >
          {t(item.title)}
        </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAssetValueFilters;