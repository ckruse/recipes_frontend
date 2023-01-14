import { Nullable, TStep, TTag, TUser } from ".";

export type TRecipe = {
  id: string;
  name: string;
  defaultServings: number;
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

  calories: Nullable<{
    carbs: number;
    fats: number;
    proteins: number;
    alcohol: number;
    calories: number;
  }>;

  fittingRecipes: TRecipe[];
};

export interface IRecipesQueryResult {
  recipes: TRecipe[];
}

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
