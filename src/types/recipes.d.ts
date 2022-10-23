import { Nullable, TMutationResult, TStep, TTag, TUser } from ".";

export type TRecipe = {
  id: string;
  name: string;
  description: Nullable<string>;

  ownerId: string;

  insertedAt: string;
  updatedAt: string;

  steps: TStep[];
  tags: TTag[];
  owner: TUser;
};

export interface IRecipeQueryResult {
  recipe: TRecipe;
}

export interface IRecipeMutation {
  mutateRecipe: TMutationResult<TRecipe>;
}

export interface IRecipeStepMutation {
  mutateStep: TMutationResult<TStep>;
}
