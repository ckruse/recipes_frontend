import { TRecipe } from "../types";

export const recipesPath = () => "/recipes";
export const showRecipePath = (recipe: TRecipe) => `/recipes/${recipe.id}`;
export const editRecipePath = (recipe: TRecipe) => `/recipes/${recipe.id}/edit`;
