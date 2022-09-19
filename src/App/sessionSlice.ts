import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAuthorizationToken, removeAuthorizationToken, setAuthorizationToken } from "../authenticationToken";
import { REFRESH_MUTATION } from "../graphql/session";
import { MutationError } from "../handleError";
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

    try {
      const { data } = await client.mutate<IRefreshMutation>({
        mutation: REFRESH_MUTATION,
        variables: { token: getAuthorizationToken() },
      });

      if (!data?.refresh.successful) {
        throw new MutationError(data?.refresh);
      }

      dispatch(setUser(data.refresh.result.user));
      dispatch(setToken(data.refresh.result.token));
      setAuthorizationToken(data.refresh.result.token);
    } catch (e) {
      console.error(e);

      dispatch(setUser(null));
      removeAuthorizationToken();
      // dispatch(addErrorFlash("Die Autorisierung ist fehlgeschlagen, bitte melden Sie sich neu an!"));
    }

    dispatch(setLoading(false));
  };

export default sessionSlice.reducer;
