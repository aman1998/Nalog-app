import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth/reducers";
import assetsSlice from "./assets/reducers";
import userSlice from "./user/reducers";
import filterSlice from "./filter/reducers";
import transactionsSlice from "./transactions/reducers";
import reportsSlice from "./reports/reducers";
import modalsSlice from "./modals/reducers";
import servicesSlice from "./services/reducers";
import commonSlice from "./common/reducers";

export const rootReducer = combineReducers({
  auth: authSlice,
  assets: assetsSlice,
  user: userSlice,
  filter: filterSlice,
  transactions: transactionsSlice,
  reports: reportsSlice,
  modals: modalsSlice,
  services: servicesSlice,
  common: commonSlice,
});
