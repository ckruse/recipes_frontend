import { TIngredient, TStepIngredient } from "../types";

export const calories = (ingredient: TIngredient) =>
  ingredient.alc * 7 + ingredient.carbs * 4 + ingredient.fat * 9 + ingredient.proteins * 4;

export const stepUnitToGrams = (stepIngredient: TStepIngredient) => {
  if (stepIngredient.unit) {
    return stepIngredient.amount * stepIngredient.unit.baseValue;
  }

  return stepIngredient.amount;
};
