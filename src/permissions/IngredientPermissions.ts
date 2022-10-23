import { PermissionBagType } from ".";
import { TIngredient } from "../types";

const IngredientPermissions: PermissionBagType<TIngredient>["ingredients"] = {
  default: (user, resource) => true,
  edit: (user, resource) => user?.role === "ROOT",
  delete: (user, resource) => user?.role === "ROOT",
};

export default IngredientPermissions;
