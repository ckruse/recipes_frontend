type TWeekplanEntry = {
  id: number;
  userId: number;
  recipeId: number;
  date: string;
  portions: number;

  insertedAt: string;
  updatedAt: string;

  recipe: TRecipe;
};

interface IWeekplansQueryResult {
  weekplans: TWeekplanEntry[];
}

interface ICreateWeekplanMutation {
  createWeekplan: TRecipe;
}

interface IReplaceWeekplanRecipeMutation {
  replaceWeekplanRecipe: TRecipe;
}

interface IReplaceWeekplanRecipeWithRecipeMutation {
  replaceWeekplanRecipeWithRecipe: TRecipe;
}
