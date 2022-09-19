import { TIngredient } from "./types";

export const calories = (ingredient: TIngredient) =>
  ingredient.alc * 7 + ingredient.carbs * 4 + ingredient.fat * 9 + ingredient.proteins * 4;
