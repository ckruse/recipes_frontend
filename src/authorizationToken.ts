import type { Nilable } from "./types";

export function setAuthorizationToken(token: string) {
  localStorage.setItem("recipesToken", token);
}

export function removeAuthorizationToken() {
  if (process.env.NODE_ENV !== "development") {
    localStorage.removeItem("recipesToken");
  }
}

export function getAuthorizationToken(): Nilable<string> {
  return localStorage.recipesToken;
}
