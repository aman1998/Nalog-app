import { createSlice } from "@reduxjs/toolkit";

import { IPayloadAction } from "../rootInterface";

import { EModals, TModalsStoreState, ToggleModalActionPayload } from "./types";

const initialState: TModalsStoreState = {

};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal(state, action: IPayloadAction<ToggleModalActionPayload>) {
      state[action.payload.modal] = action.payload.visible;
    },
    openModal(state, action: IPayloadAction<EModals>) {
      state[action.payload] = true;
    },
    closeModal(state, action: IPayloadAction<EModals>) {
      state[action.payload] = false;
    },
  },
});

export const { toggleModal, openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
