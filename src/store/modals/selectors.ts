import { createSelector } from "@reduxjs/toolkit";

import { IApplicationState } from "../rootInterface";

import { EModals, TModalsOutputSelector } from "./types";

const selectState = (state: IApplicationState) => state.modals;

export const modalStateSelector = (modal: EModals): TModalsOutputSelector<boolean | undefined> =>
  createSelector(selectState, modals => modals[modal]
  );