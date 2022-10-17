import { Nilable } from "./types";

export function setAuthorizationToken(token: string) {
  localStorage.setItem("ttAcdToken", token);
}

export function removeAuthorizationToken() {
  if (process.env.NODE_ENV !== "development") {
    localStorage.removeItem("ttAcdToken");
  }
}

export function getAuthorizationToken(): Nilable<string> {
  return localStorage.ttAcdToken;
}
