import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { REFRESH_MUTATION } from "@graphql/session";

import { setAuthorizationToken } from "@/authorizationToken";
import type { AppThunk, RootState } from "@/store";

export interface SessionState {
  user: Nullable<TUser>;
  showLogin: boolean;
  showPasswordReset: boolean;
  checked: boolean;
  loading: boolean;
  token: Nullable<string>;
  subNav: Nullable<React.ReactNode>;
}

const initialState: SessionState = {
  user: null,
  showLogin: false,
  showPasswordReset: false,
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
    setShowLogin(state, action: PayloadAction<boolean>) {
      state.showLogin = action.payload;
    },
    toggleShowPasswordReset(state) {
      state.showPasswordReset = !state.showPasswordReset;
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

export const { setUser, setShowLogin, toggleShowPasswordReset, setLoading, setToken, addSubnav, removeSubnav } =
  sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;

export const refreshUser =
  (client: ApolloClient<NormalizedCacheObject>): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await client.mutate<IRefreshMutation>({ mutation: REFRESH_MUTATION });

      if (!data?.refresh) {
        // TODO: handle error
        dispatch(setUser(null));
        return;
      }

      dispatch(setUser(data.refresh.user));
      setAuthorizationToken(data.refresh.token);
    } catch (e) {
      console.error(e);
      dispatch(setUser(null));
    }

    dispatch(setLoading(false));
  };

export default sessionSlice.reducer;
