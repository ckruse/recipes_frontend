import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import sessionReducer from "./App/sessionSlice";
import flashReducer from "./features/Flash/flashSlice";
import metaListReducer from "./features/MetaList/metaListSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    flash: flashReducer,
    metaList: metaListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
