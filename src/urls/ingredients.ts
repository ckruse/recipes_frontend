import { TIngredient } from "../types";

export const ingredientsPath = () => "/ingredients";
export const newIngredientPath = () => "/ingredients/new";
export const showIngredientPath = (ingredient: TIngredient) => `/ingredients/${ingredient.id}`;
export const editIngredientPath = (ingredient: TIngredient) => `/ingredients/${ingredient.id}/edit`;
