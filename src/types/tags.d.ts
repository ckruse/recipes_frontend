import { TRecipe } from ".";

export type TTag = {
  id: string;
  name: string;
  recipesCount: number;

  updatedAt: string;
  insertedAt: string;

  recipes: TRecipe[];
};

export interface TagsDataInterface {
  tags: TTag[];
}

export interface TagDataInterface {
  tag: TTag;
}

export interface TagCreateMutationInterface {
  createTag: TTag;
}
