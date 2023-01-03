import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { Nullable, TWeekplanEntry } from "../../types";

export interface IWeekplanReducerState {
  showWeekplanCreateModal: boolean;
  showReplaceModal: Nullable<TWeekplanEntry>;
}

const initialState: IWeekplanReducerState = {
  showWeekplanCreateModal: false,
  showReplaceModal: null,
};

export const weekplanSlice = createSlice({
  name: "weekplan",
  initialState,
  reducers: {
    setWeekplanCreateModal(state, action: PayloadAction<boolean>) {
      state.showWeekplanCreateModal = action.payload;
    },

    setReplaceModal(state, action: PayloadAction<Nullable<TWeekplanEntry>>) {
      state.showReplaceModal = action.payload;
    },
  },
});

export const { setWeekplanCreateModal, setReplaceModal } = weekplanSlice.actions;

export const selectWeekplan = (state: RootState) => state.weekplan;

export default weekplanSlice.reducer;
