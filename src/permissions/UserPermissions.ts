import type { PermissionBagType } from ".";

const UserPermissions: PermissionBagType<TUser>["users"] = {
  list: (user, _resource) => user?.role === "ROOT",
  create: (user, _resource) => user?.role === "ROOT",
  default: (user, resource) => user?.role === "ROOT" || user?.id === resource.id,
};

export default UserPermissions;
