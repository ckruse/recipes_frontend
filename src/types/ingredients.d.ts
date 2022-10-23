import { TMutationResult } from ".";

export type TIngredient = {
  id: string;
  name: string;
  reference: "G" | "ML";
  alc: number;
  carbs: number;
  fat: number;
  proteins: number;

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
