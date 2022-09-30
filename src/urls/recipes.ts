import { TRecipe } from "../types";

export const recipesPath = () => "/recipes";
export const newRecipePath = () => "/recipes/new";
export const showRecipePath = (recipe: TRecipe) => `/recipes/${recipe.id}`;
export const editRecipePath = (recipe: TRecipe) => `/recipes/${recipe.id}/edit`;
