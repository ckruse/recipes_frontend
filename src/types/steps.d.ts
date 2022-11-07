import { Nullable, TIngredient, TUnit } from ".";

export type TStep = {
  id: string;
  position: number;
  description: string;

  insertAt: string;
  updateAt: string;

  stepIngredients: TStepIngredient[];
};

export type TStepIngredient = {
  id: string;
  amount: number;
  unitId: Nullable<string>;
  unit: Nullable<TUnit>;

  insertAt: string;
  updateAt: string;

  stepId: string;
  ingredientId: string;

  step: TStep;
  ingredient: TIngredient;
};
