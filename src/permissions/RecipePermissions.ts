import { PermissionBagType } from ".";
import { TRecipe } from "../types";

const RecipePermissions: PermissionBagType<TRecipe>["recipes"] = {
  default: (user, resource) => true,
  edit: (user, resource) => user?.role === "ROOT" || resource.ownerId === user?.id,
  delete: (user, resource) => user?.role === "ROOT",
};

export default RecipePermissions;
