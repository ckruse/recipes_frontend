import { TIngredient } from "./ingredients";

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
  unit: string;

  insertAt: string;
  updateAt: string;

  steps: TStep[];
  ingredients: TIngredient[];
};
