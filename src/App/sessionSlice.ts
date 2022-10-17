import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { REFRESH_MUTATION } from "../graphql/session";
import { MutationError } from "../handleError";
import { AppThunk, RootState } from "../store";
import { IRefreshMutation, Nullable, TUser } from "../types";

export interface SessionState {
  user: Nullable<TUser>;
  showLogin: boolean;
  checked: boolean;
  loading: boolean;
  token: Nullable<string>;
  subNav: Nullable<React.ReactNode>;
}

const initialState: SessionState = {
  user: null,
  showLogin: false,
  checked: false,
  loading: false,
  token: null,
  subNav: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Nullable<TUser>>) {
      state.user = action.payload as unknown as TUser;
      state.checked = true;
    },
    toggleShowLogin(state) {
      state.showLogin = !state.showLogin;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    addSubnav(state, action: PayloadAction<React.ReactNode>) {
      state.subNav = action.payload;
    },
    removeSubnav(state) {
      state.subNav = null;
    },
  },
});

export const { setUser, toggleShowLogin, setLoading, setToken, addSubnav, removeSubnav } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;

export const refreshUser =
  (client: ApolloClient<NormalizedCacheObject>): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await client.mutate<IRefreshMutation>({ mutation: REFRESH_MUTATION });

      if (!data?.refresh.successful) {
        throw new MutationError(data?.refresh);
      }

      dispatch(setUser(data.refresh.result.user));
    } catch (e) {
      console.error(e);
      dispatch(setUser(null));
    }

    dispatch(setLoading(false));
  };

export default sessionSlice.reducer;
