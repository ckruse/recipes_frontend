import { PermissionBagType } from ".";
import { TTag } from "../types";

const TagPermissions: PermissionBagType<TTag>["tags"] = {
  default: (user, resource) => true,
  create: (user, resource) => !!user,
  edit: (user, resource) => user?.role === "ROOT",
  delete: (user, resource) => user?.role === "ROOT",
};

export default TagPermissions;
