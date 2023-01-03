import { TRecipe } from ".";

export type TWeekplanEntry = {
  id: number;
  userId: number;
  recipeId: number;
  date: string;
  portions: number;

  insertedAt: string;
  updatedAt: string;

  recipe: TRecipe;
};

export interface IWeekplansQueryResult {
  weekplans: TWeekplanEntry[];
}

export interface ICreateWeekplanMutation {
  createWeekplan: TRecipe;
}
