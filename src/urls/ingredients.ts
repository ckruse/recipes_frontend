export const ingredientsPath = (search?: string) =>
  "/ingredients" + (search ? `?search=${encodeURIComponent(search)}` : "");
export const newIngredientPath = () => "/ingredients/new";
export const showIngredientPath = (ingredient: TIngredient) => `/ingredients/${ingredient.id}`;
export const editIngredientPath = (ingredient: TIngredient) => `/ingredients/${ingredient.id}/edit`;
