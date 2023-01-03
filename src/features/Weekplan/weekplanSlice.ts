import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

export interface IWeekplanReducerState {
  showWeekplanCreateModal: boolean;
}

const initialState: IWeekplanReducerState = {
  showWeekplanCreateModal: false,
};

export const weekplanSlice = createSlice({
  name: "weekplan",
  initialState,
  reducers: {
    setWeekplanCreateModal(state, action: PayloadAction<boolean>) {
      state.showWeekplanCreateModal = action.payload;
    },
  },
});

export const { setWeekplanCreateModal } = weekplanSlice.actions;

export const selectWeekplan = (state: RootState) => state.weekplan;

export default weekplanSlice.reducer;
