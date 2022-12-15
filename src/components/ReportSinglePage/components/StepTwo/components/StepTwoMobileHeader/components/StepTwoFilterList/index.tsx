import cn from "classnames";
import { omit } from "lodash";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

import CloseIcon from "components/Icons/CloseIcon";
import { EDateFilter } from "components/Transactions/types";

import { TSelectedDate, TTransactionsFilterState } from "store/filter/types";
import { setFilterTransactions, setSelectedDates } from "store/filter/reducers";
import { getTransactionsListRequest } from "store/transactions/reducers";
import { getMyAssetsDataSelector } from "store/assets/selectors";
import { getFilterTransactionSelector, getSelectedDatesSelector } from "store/filter/selectors";

import { StepTwoFilterListProps } from "./types";

const StepTwoFilterList: FC<StepTwoFilterListProps> = ({ visible, headerFilters, setHeaderFilter }) => {
  const { t } = useTranslation();
  const assets = useSelector(getMyAssetsDataSelector);
  const filterState = useSelector(getFilterTransactionSelector);
  const selectedDate = useSelector(getSelectedDatesSelector);

  const dispatch = useDispatch();

  const getFilters = () => Object.entries(omit(headerFilters, "page", "account") || {});

  const checkIsDate = (value: string) => {
    if (value === EDateFilter.date_from) return t("naming.from");
    if (value === EDateFilter.date_to) return t("naming.to");
    else return "";
  };

  const checkIsFilter = () => {
    let check = false;
    getFilters().forEach(item => {
      if (item[1] !== null && item[1] !== "") check = true;
    });
    return check;
  };

  const getName = (value: unknown) => {
    if (!!assets) {
      for (let i = 0; i <= assets.length; i++) {
        if (assets[i]?.id === value) return assets[i]?.name || t("naming.exchange");
      }
    }
    return value;
  };

  const deleteFilters = (value: string) => {
    const obj = omit(filterState, value) as TTransactionsFilterState;
    const _dateFilter: TSelectedDate = [null, null];

    if (value === EDateFilter.date_from && selectedDate) {
      _dateFilter.splice(0, 1, selectedDate[0]);
    }
    if (value === EDateFilter.date_to && selectedDate) {
      _dateFilter.splice(1, 1, selectedDate[1]);
    }
    dispatch(setSelectedDates(_dateFilter));

    setHeaderFilter(obj);
    dispatch(setFilterTransactions({ ...obj, page: 1 }));
    dispatch(getTransactionsListRequest({ ...obj }));
  };

  useEffect(() => {
    if (visible) {
      dispatch(setFilterTransactions(headerFilters));

      const _dateFilter: TSelectedDate = [null, null];
      if (EDateFilter.date_from in headerFilters) {
        _dateFilter.splice(0, 1, moment(headerFilters[EDateFilter.date_from], "DD.MM.YYYY"));
      }

      if (EDateFilter.date_to in headerFilters) {
        _dateFilter.splice(1, 1, moment(headerFilters[EDateFilter.date_to], "DD.MM.YYYY"));
      }

      dispatch(setSelectedDates(_dateFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div
      className={cn("filter-list", {
        isFilterActive: checkIsFilter(),
      })}
    >
      {getFilters().map(item =>
        item[1] === null ? (
          <></>
        ) : (
          item[1] !== "" && (
            <div key={item[0]} className="filter-list__item">
              <p>
                {checkIsDate(item[0])} {getName(item[1] ?? "")}
              </p>
              <div onClick={() => deleteFilters(item[0])}>
                <CloseIcon />
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default StepTwoFilterList;
