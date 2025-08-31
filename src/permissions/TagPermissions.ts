import type { PermissionBagType } from ".";

const TagPermissions: PermissionBagType<TTag>["tags"] = {
  default: (_user, _resource) => true,
  create: (user, _resource) => !!user,
  edit: (user, _resource) => user?.role === "ROOT",
  delete: (user, _resource) => user?.role === "ROOT",
};

export default TagPermissions;
