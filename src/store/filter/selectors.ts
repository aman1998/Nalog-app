import { createSelector } from "@reduxjs/toolkit";

import { IApplicationState } from "../rootInterface";

const selectState = (state: IApplicationState) => state.filter;

export const getFilterTransactionSelector = createSelector(selectState, filter => filter.transactionsFilterState);
export const getSelectedDatesSelector = createSelector(selectState, filter => filter.selectedDates);
