import { useEffect, useState } from "react";
import { omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { TNullable } from "config/types";

import { setFilterTransactions, setSelectedDates } from "store/filter/reducers";
import { getTransactionsListRequest } from "store/transactions/reducers";
import { TSelectedDate, TTransactionsFilterState } from "store/filter/types";
import { getFilterTransactionSelector, getSelectedDatesSelector } from "store/filter/selectors";

import { EDateFilter } from "../../types";

type TUseTransactionsHeaderMobileFilter =
  ({ visible, setVisible }: {visible: boolean, setVisible: (value: boolean) => void}) => {
  getFilters: () => [string, TNullable<string>][]
  deleteFilters: (value: string) => void;
  handleFilter: () => void;
  checkIsFilter: () => void;
};
  
export const useTransactionsHeaderMobileFilter:TUseTransactionsHeaderMobileFilter = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(getSelectedDatesSelector);
  const filterState = useSelector(getFilterTransactionSelector);
  const [headerFilters, setHeaderFilter] = useState<TTransactionsFilterState>({});

  const getFilters = () => Object.entries(omit(headerFilters, 'page') || {});

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

  const handleFilter = () => {
    dispatch(getTransactionsListRequest(filterState));
    setVisible(false);
    if (filterState) setHeaderFilter(filterState);
  };
  
  const checkIsFilter = () => {
    let check = false;
    getFilters().forEach(item => {
      if (item[1] !== null && item[1] !== "") check = true;
    });
    return check;
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

  
  return { getFilters, deleteFilters, handleFilter, checkIsFilter };
};