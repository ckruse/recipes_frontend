export const URI =
  process.env.NODE_ENV === "production" ? "https://recipes.wwwtech.de" : `http://${document.location.hostname}:8080`;

export const calories = (ingredient: TIngredient) =>
  ingredient.alc * 7.1 + ingredient.carbs * 4.1 + ingredient.fat * 9.3 + ingredient.proteins * 4.1;

export const stepUnitToGrams = (stepIngredient: TStepIngredient) => {
  if (!stepIngredient.amount) return 0;

  if (stepIngredient.unit) {
    return stepIngredient.amount * stepIngredient.unit.baseValue;
  }

  return stepIngredient.amount;
};
