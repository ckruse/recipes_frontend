import { Nullable, TIngredient, TUnit } from ".";

export type TStep = {
  id: string;
  position: number;
  preparationTime: number;
  cookingTime: number;
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

export interface ICreateRecipeStepMutation {
  createStep: TStep;
}
export interface IUpdateRecipeStepMutation {
  updateStep: TStep;
}

export interface IDeleteRecipeStepMutation {
  deleteStep: boolean;
}

export interface IMoveStepUpMutation {
  moveStepUp: TStep[];
}

export interface IMoveStepDownMutation {
  moveStepDown: TStep[];
}
