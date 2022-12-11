import { Nullable, TStep, TTag, TUser } from ".";

export type TRecipe = {
  id: string;
  name: string;
  description: Nullable<string>;
  image: {
    thumb: string;
    large: string;
    original: string;
  } | null;

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

export interface ICreateRecipeMutation {
  createRecipe: TRecipe;
}

export interface IUpdateRecipeMutation {
  updateRecipe: TRecipe;
}

export interface IRandomRecipeQueryResult {
  randomRecipe: Nullable<TRecipe>;
}
