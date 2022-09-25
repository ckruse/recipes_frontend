export type TIngredient = {
  id: number;
  name: string;
  reference: "G" | "ML";
  alc: number;
  carbs: number;
  fat: number;
  proteins: number;

  insertedAt: string;
  updatedAt: string;
};

export interface IIngredientQueryResult {
  ingredient: TIngredient;
}

export interface IIngredientCreateMutation {
  createIngredient: TIngredient;
}

export interface IIngredientUpdateMutation {
  updateIngredient: TIngredient;
}
