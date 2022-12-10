import { TRecipe } from ".";

export type TTag = {
  id: string;
  name: string;

  updatedAt: string;
  insertedAt: string;

  recipes: TRecipe[];
};

export interface TagsDataInterface {
  tags: TTag[];
}

export interface TagCreateMutationInterface {
  createTag: TTag;
}
