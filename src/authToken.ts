import { setToken } from "@/App/sessionSlice";
import { store } from "@/store";

export function setAuthorizationToken(token: string) {
  localStorage.setItem("jwtToken", token);
  store.dispatch(setToken(token));
}

export function removeAuthorizationToken() {
  if (import.meta.env.MODE !== "development") {
    localStorage.removeItem("jwtToken");
    store.dispatch(setToken(null));
  }
}

export function getAuthorizationToken(): Nilable<string> {
  return localStorage.jwtToken;
}
