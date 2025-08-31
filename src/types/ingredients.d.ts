type TUnitIdentifier = "PCS" | "TBSP" | "TSP" | "SKOSH" | "PINCH";

type TUnit = {
  id: string;
  identifier: TUnitIdentifier;
  baseValue: number;

  ingredientId: string;
  ingredient: TIngredient;

  insertedAt: string;
  updatedAt: string;
};

type TIngredient = {
  id: string;
  name: string;
  reference: "G" | "ML";
  alc: number;
  carbs: number;
  fat: number;
  proteins: number;

  units: TUnit[];

  insertedAt: string;
  updatedAt: string;

  calories: number;
};

interface IIngredientsQueryResult {
  ingredients: TIngredient[];
}

interface IIngredientQueryResult {
  ingredient: TIngredient;
}

interface IIngredientCreateMutation {
  createIngredient: TIngredient;
}

interface IIngredientUpdateMutation {
  updateIngredient: TIngredient;
}
