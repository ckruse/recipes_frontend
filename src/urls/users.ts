import type { TUser } from "../types";

export const usersPath = () => "/users";
export const newUserPath = () => "/users/new";
export const showUserPath = (user: TUser) => `/users/${user.id}`;
export const editUserPath = (user: TUser) => `/users/${user.id}/edit`;
