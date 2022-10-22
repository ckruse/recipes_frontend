import { Nullable, TMutationResult, TTag, TStep } from ".";

export type TRecipe = {
  id: string;
  name: string;
  description: Nullable<string>;

  insertedAt: string;
  updatedAt: string;

  steps: TStep[];
  tags: TTag[];
};

export interface IRecipeQueryResult {
  recipe: TRecipe;
}

export interface IRecipeMutation {
  mutateRecipe: TMutationResult<TRecipe>;
}
