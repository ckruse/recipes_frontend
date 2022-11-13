import { TIngredient, TRecipe, TStepIngredient } from "../types";

export const calories = (ingredient: TIngredient) =>
  ingredient.alc * 7 + ingredient.carbs * 4 + ingredient.fat * 9 + ingredient.proteins * 4;

export const stepUnitToGrams = (stepIngredient: TStepIngredient) => {
  if (stepIngredient.unit) {
    return stepIngredient.amount * stepIngredient.unit.baseValue;
  }

  return stepIngredient.amount;
};

export const recipeCalories = (recipe: TRecipe) => {
  return recipe.steps
    .flatMap((step) => step.stepIngredients)
    .reduce(
      (acc, stepIngredient) => {
        const grams = stepUnitToGrams(stepIngredient) / 100;
        acc.calories += calories(stepIngredient.ingredient) * grams;
        acc.alc += stepIngredient.ingredient.alc * grams;
        acc.carbs += stepIngredient.ingredient.carbs * grams;
        acc.fat += stepIngredient.ingredient.fat * grams;
        acc.proteins += stepIngredient.ingredient.proteins * grams;

        return acc;
      },
      { calories: 0, proteins: 0, fat: 0, carbs: 0, alc: 0 }
    );
};