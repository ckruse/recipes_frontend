import { Nullable, TUser } from "../types";
import UserPermissions from "./UserPermissions";

export type TModule = "users";
export type TAction = "create" | "list" | "show" | "edit" | "delete" | "default";
export type PermissionBagType<T> = Record<
  TModule,
  Partial<Record<TAction, (user: Nullable<TUser>, resource: T) => boolean>>
>;

const PERMISSIONS: PermissionBagType<any> = {
  ...UserPermissions,
};

export default function may<T>(user: Nullable<TUser>, module: TModule, action: TAction = "default", resource?: T) {
  const fun = PERMISSIONS[module]?.[action] || PERMISSIONS[module]?.default;

  if (!fun) {
    return false;
  }

  return fun(user, resource);
}
