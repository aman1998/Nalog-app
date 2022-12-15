import { createSlice } from "@reduxjs/toolkit";

import { defaultTransactionsFilter, TFilterStoreState } from "./types";

const initialState: TFilterStoreState = {
  transactionsFilterState: defaultTransactionsFilter,
  transactionsFilterAction: false,
  selectedDates: null,
};

const filterSlace = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterTransactionsAction(state, action) {
      state.transactionsFilterAction = action.payload;
    },
    setFilterTransactions(state, action) {
      state.transactionsFilterState = action.payload;
    },
    setFilterTransactionsDefault(state) {
      state.transactionsFilterState = defaultTransactionsFilter;
    },
    clearFilterState() {
      return initialState;
    },
    setSelectedDates(state, actions) {
      state.selectedDates = actions.payload;
    }
  },
});

export const {
  setFilterTransactions,
  setFilterTransactionsDefault,
  clearFilterState,
  setFilterTransactionsAction,
  setSelectedDates,
} = filterSlace.actions;
export default filterSlace.reducer;
