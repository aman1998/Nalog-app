import { all, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import ym from "react-yandex-metrika";

import { sendAmplitudeEvent } from "utils/amplitudeAnalytic";

import { EEventType, ISendGAStatisticPayload } from "./types";


function* analyticEventAction(action: PayloadAction<ISendGAStatisticPayload>): Generator {
  const { gtag } = window;
  const { event } = action.payload;

  if (process.env.REACT_APP_GOOGLE_ANALYTIC) {
    gtag('event', event);
  }
  if (process.env.REACT_APP_AMPLITUDE_ID) {
    sendAmplitudeEvent(event);
  }
  if (process.env.REACT_APP_YM_CODE) {
    ym('reachGoal', event);
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(ANALYTIC_EVENT, analyticEventAction),
  ]);
}

export const ANALYTIC_EVENT = 'ANALYTIC_EVENT';
export const analyticEvent = (
  event: EEventType | string,
): PayloadAction<ISendGAStatisticPayload> => ({
  type: ANALYTIC_EVENT,
  payload: { event }
});
export default Saga;
