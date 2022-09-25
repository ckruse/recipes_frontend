import { gql } from "@apollo/client";

export const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on Recipe {
    id
    name
    description

    insertedAt
    updatedAt

    tags {
      id
      tag
      insertedAt
      updatedAt
    }
  }
`;

export const RECIPES_QUERY = gql`
  query recipes($search: String, $tags: [String], $limit: Int!, $offset: Int!) {
    recipes(search: $search, tags: $tags, limit: $limit, offset: $offset) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;

export const RECIPES_COUNT_QUERY = gql`
  query recipes($search: String, $tags: [String]) {
    countRecipes(search: $search, tags: $tags)
  }
  ${RECIPE_FRAGMENT}
`;

export const RECIPE_QUERY = gql`
  query recipe($id: ID!) {
    recipe(id: $id) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;

export const RECIPE_CREATE_MUTATION = gql`
  mutation createRecipe($recipe: RecipeInput!) {
    createRecipe(recipe: $recipe) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;

export const RECIPE_UPDATE_MUTATION = gql`
  mutation updateRecipe($id: ID!, $recipe: RecipeInput!) {
    updateRecipe(id: $id, recipe: $recipe) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;

export const RECIPE_DELETE_MUTATION = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;
