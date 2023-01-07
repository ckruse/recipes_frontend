import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { startOfISOWeek } from "date-fns";

import { RootState } from "../../store";
import { Nullable, TWeekplanEntry } from "../../types";

export interface IWeekplanReducerState {
  week: Date;
  showWeekplanCreateModal: boolean;
  showReplaceModal: Nullable<TWeekplanEntry>;
}

const initialState: IWeekplanReducerState = {
  week: startOfISOWeek(new Date()),
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

    setWeek(state, action: PayloadAction<Date>) {
      state.week = action.payload;
    },
  },
});

export const { setWeekplanCreateModal, setReplaceModal, setWeek } = weekplanSlice.actions;

export const selectWeekplan = (state: RootState) => state.weekplan;

export default weekplanSlice.reducer;
