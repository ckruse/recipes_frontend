import { TRecipe } from ".";

export type TTag = {
  id: string;
  name: string;
  recipesCount: number;

  updatedAt: string;
  insertedAt: string;

  recipes: TRecipe[];
};

export interface ITagsData {
  tags: TTag[];
}

export interface ITagData {
  tag: TTag;
}

export interface ITagCreateMutation {
  createTag: TTag;
}

export interface ITagDeleteMutation {
  deleteTag: boolean;
}
