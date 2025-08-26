import { PermissionBagType } from ".";
import { TRecipe } from "../types";

const RecipePermissions: PermissionBagType<TRecipe>["recipes"] = {
  default: (_user, _resource) => true,
  create: (user, _resource) => !!user,
  edit: (user, resource) => user?.role === "ROOT" || resource.ownerId === user?.id,
  delete: (user, _resource) => user?.role === "ROOT",
};

export default RecipePermissions;
