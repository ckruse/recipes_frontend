export function setAuthorizationToken(token: string) {
  localStorage.setItem("recipesToken", token);
}

export function removeAuthorizationToken() {
  if (import.meta.env.MODE !== "development") {
    localStorage.removeItem("recipesToken");
  }
}

export function getAuthorizationToken(): Nilable<string> {
  return localStorage.recipesToken;
}
