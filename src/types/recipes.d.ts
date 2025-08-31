type TRecipe = {
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

interface IRecipesQueryResult {
  recipes: TRecipe[];
}

interface IRecipeQueryResult {
  recipe: TRecipe;
}

interface ICreateRecipeMutation {
  createRecipe: TRecipe;
}

interface IUpdateRecipeMutation {
  updateRecipe: TRecipe;
}

interface IRandomRecipeQueryResult {
  randomRecipe: Nullable<TRecipe>;
}
