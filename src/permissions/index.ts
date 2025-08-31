import IngredientPermissions from "./IngredientPermissions";
import RecipePermissions from "./RecipePermissions";
import TagPermissions from "./TagPermissions";
import UserPermissions from "./UserPermissions";
import WeekplanPermissions from "./WeekplanPermissions";

export type TModule = "users" | "recipes" | "ingredients" | "weekplan" | "tags";
export type TAction = "create" | "list" | "show" | "edit" | "delete" | "default";
export type PermissionBagType<T> = Record<
  TModule,
  Partial<Record<TAction, (user: Nullable<TUser>, resource: T) => boolean>>
>;

const PERMISSIONS: PermissionBagType<any> = {
  users: UserPermissions,
  recipes: RecipePermissions,
  ingredients: IngredientPermissions,
  weekplan: WeekplanPermissions,
  tags: TagPermissions,
};

export default function may<T>(user: Nullable<TUser>, module: TModule, action: TAction = "default", resource?: T) {
  const fun = PERMISSIONS[module]?.[action] || PERMISSIONS[module]?.default;

  if (!fun) {
    return false;
  }

  return fun(user, resource);
}
