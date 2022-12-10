import { TRecipe } from "../types";

export const recipesPath = (search?: string) => "/recipes" + (search ? `?search=${encodeURIComponent(search)}` : "");
export const newRecipePath = () => "/recipes/new";
export const showRecipePath = (recipe: TRecipe) => `/recipes/${recipe.id}`;
export const editRecipePath = (recipe: TRecipe) => `/recipes/${recipe.id}/edit`;

export const bringImportUri = (recipe: TRecipe, portions: number) => {
  const uri = `https://recipes.wwwtech.de/recipes/${recipe.id}/bring.json?portions=${portions}`;
  return `https://api.getbring.com/rest/bringrecipes/deeplink?url=${encodeURIComponent(uri)}&source=web`;
};
