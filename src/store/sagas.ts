import { all, fork } from "redux-saga/effects";

import signInSaga from "store/auth/effects";
import assetsSaga from "store/assets/effects";
import userSaga from "store/user/effects";
import transactionsSaga from "store/transactions/effects";
import reportsSage from 'store/reports/effects';
import servicesSage from 'store/services/effects';
import googleAnalyticsSaga from 'store/analytics/effects';
import commonSaga from 'store/common/effects';

export default function* rootSaga(): Generator {
  yield all([
    fork(signInSaga),
    fork(assetsSaga),
    fork(userSaga),
    fork(transactionsSaga),
    fork(reportsSage),
    fork(googleAnalyticsSaga),
    fork(servicesSage),
    fork(commonSaga)
  ]);
}
