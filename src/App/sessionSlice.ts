import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { t } from "i18next";

import { getAuthorizationToken, removeAuthorizationToken, setAuthorizationToken } from "../authenticationToken";
import { addErrorFlash } from "../features/Flash/flashSlice";
import { REFRESH_MUTATION } from "../graphql/session";
import { MutationError } from "../handleError";
import i18n from "../i18n";
import { AppThunk, RootState } from "../store";
import { Nullable, TUser } from "../types";
import { IRefreshMutation } from "../types/session";

export interface SessionState {
  user: Nullable<TUser>;
  showLogin: boolean;
  checked: boolean;
  loading: boolean;
  token: Nullable<string>;
}

const initialState: SessionState = {
  user: null,
  showLogin: false,
  checked: false,
  loading: false,
  token: null,
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
  },
});

export const { setUser, toggleShowLogin, setLoading, setToken } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;

export const refreshUser =
  (client: ApolloClient<NormalizedCacheObject>): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    await i18n.loadNamespaces(["root"]);

    try {
      const { data } = await client.mutate<IRefreshMutation>({
        mutation: REFRESH_MUTATION,
        variables: { token: getAuthorizationToken() },
      });

      if (!data?.refresh) {
        // TODO: handle error
        return;
      }

      dispatch(setUser(data.refresh.user));
      dispatch(setToken(data.refresh.token));
      setAuthorizationToken(data.refresh.token);
    } catch (e) {
      console.error(e);

      dispatch(setUser(null));
      removeAuthorizationToken();
      dispatch(addErrorFlash(t("root:authorization_failed")));
    }

    dispatch(setLoading(false));
  };

export default sessionSlice.reducer;
