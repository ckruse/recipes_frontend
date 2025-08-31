import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid/non-secure";

import type { AppThunk, RootState } from "@/store";

export interface FlashState {
  messages: FlashMessageType[];
}

const initialState: FlashState = {
  messages: [],
};

export const flashSlice = createSlice({
  name: "flash",
  initialState,
  reducers: {
    addFlash(state, action: PayloadAction<FlashMessageType>) {
      state.messages.push(action.payload);
    },
    removeFlash(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
    },
  },
});

export const { addFlash, removeFlash } = flashSlice.actions;

export const selectFlash = (state: RootState) => state.flash;

export const addFlashMessage =
  (message: string, timeout: Nullable<number>, type: FlashTypeType): AppThunk =>
  (dispatch) => {
    const id = nanoid();

    dispatch(addFlash({ id, type, timeout, message }));

    if (timeout) {
      window.setTimeout(() => {
        dispatch(removeFlash(id));
      }, timeout);
    }
  };

export const addErrorFlash = (message: string, timeout: Nullable<number> = null) =>
  addFlashMessage(message, timeout, "error");
export const addSuccessFlash = (message: string, timeout: Nullable<number> = 5000) =>
  addFlashMessage(message, timeout, "success");
export const addInfoFlash = (message: string, timeout: Nullable<number> = 5000) =>
  addFlashMessage(message, timeout, "info");
export const addWarningFlash = (message: string, timeout: Nullable<number> = 5000) =>
  addFlashMessage(message, timeout, "warning");

export default flashSlice.reducer;
