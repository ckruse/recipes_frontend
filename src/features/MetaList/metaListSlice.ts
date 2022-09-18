import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

export interface MetaListState {
  pages: Record<string, number>;
}

const initialState: MetaListState = {
  pages: {},
};

const metaListSlice = createSlice({
  name: "mails",
  initialState,
  reducers: {
    setPage(state, { payload }: PayloadAction<{ key: string; page: number }>) {
      state.pages[payload.key] = payload.page;
    },
  },
});

export const selectMetaList = (state: RootState) => state.metaList;

export const { setPage } = metaListSlice.actions;
export default metaListSlice.reducer;
