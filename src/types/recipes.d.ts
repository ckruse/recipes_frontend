import { Nullable, TTag } from ".";

export type TRecipe = {
  id: number;
  name: string;
  description: Nullable<string>;

  insertedAt: string;
  updatedAt: string;

  // TODO: steps: TSteps[];
  tags: TTag[];
};

export interface IRecipeQueryResult {
  recipe: TRecipe;
}

export interface IRecipeCreateMutation {
  createRecipe: TRecipe;
}

export interface IRecipeUpdateMutation {
  updateRecipe: TRecipe;
}
