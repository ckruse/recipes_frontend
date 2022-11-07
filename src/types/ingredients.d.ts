import { TMutationResult } from ".";

export type TUnitIdentifier = "PCS" | "TBSP" | "TSP" | "SKOSH" | "PINCH";

export type TUnit = {
  id: string;
  identifier: TUnitIdentifier;
  baseValue: number;

  ingredientId: string;
  ingredient: TIngredient;

  insertedAt: string;
  updatedAt: string;
};

export type TIngredient = {
  id: string;
  name: string;
  reference: "G" | "ML";
  alc: number;
  carbs: number;
  fat: number;
  proteins: number;

  units: TUnit[];

  insertedAt: string;
  updatedAt: string;
};

export interface IIngredientsQueryResult {
  ingredients: TIngredient[];
}

export interface IIngredientQueryResult {
  ingredient: TIngredient;
}

export interface IIngredientMutation {
  mutateIngredient: TMutationResult<TIngredient>;
}
