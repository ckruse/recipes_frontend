import { PermissionBagType } from ".";
import { TUser } from "../types";

const UserPermissions: PermissionBagType<TUser>["users"] = {
  list: (user, resource) => user?.role === "ROOT",
  create: (user, resource) => user?.role === "ROOT",
  default: (user, resource) => user?.role === "ROOT" || user?.id === resource.id,
};

export default UserPermissions;
