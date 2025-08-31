type TTag = {
  id: string;
  name: string;
  recipesCount: number;

  updatedAt: string;
  insertedAt: string;

  recipes: TRecipe[];
};

interface ITagsData {
  tags: TTag[];
}

interface ITagData {
  tag: TTag;
}

interface ITagCreateMutation {
  createTag: TTag;
}

interface ITagDeleteMutation {
  deleteTag: boolean;
}
