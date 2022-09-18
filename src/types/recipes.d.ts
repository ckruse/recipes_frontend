import { MutationResultType, Nullable, TTag } from ".";

export type TRecipe = {
  id: string;
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

export interface IRecipeMutation {
  mutateRecipe: MutationResultType<TRecipe>;
}
