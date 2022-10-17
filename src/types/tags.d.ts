import { TMutationResult, TRecipe } from ".";

export type TTag = {
  id: string;
  tag: string;

  updatedAt: string;
  insertedAt: string;

  recipes: TRecipe[];
};

export interface TagsDataInterface {
  tags: TTag[];
}

export interface TagMutationInterface {
  mutateTag: TMutationResult<TTag>;
}
