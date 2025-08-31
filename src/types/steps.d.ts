type TStep = {
  id: number;
  name: Nullable<string>;
  position: number;
  preparationTime: number;
  cookingTime: number;
  description: string;

  insertAt: string;
  updateAt: string;

  stepIngredients: TStepIngredient[];
};

type TStepIngredient = {
  id: number;
  amount: Nullable<number>;
  annotation: Nullable<string>;
  unitId: Nullable<string>;
  unit: Nullable<TUnit>;

  insertAt: string;
  updateAt: string;

  stepId: number;
  ingredientId: number;

  step: TStep;
  ingredient: TIngredient;
};

interface ICreateRecipeStepMutation {
  createStep: TStep;
}
interface IUpdateRecipeStepMutation {
  updateStep: TStep;
}

interface IDeleteRecipeStepMutation {
  deleteStep: boolean;
}

interface IMoveStepUpMutation {
  moveStepUp: TStep[];
}

interface IMoveStepDownMutation {
  moveStepDown: TStep[];
}
