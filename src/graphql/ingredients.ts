import { gql } from "@apollo/client";

export const INGREDEINT_FRAGMENT = gql`
  fragment IngredientFragment on Ingredient {
    id
    name
    reference
    alc
    carbs
    fat
    proteins

    units {
      id
      ingredientId
      identifier
      baseValue

      insertedAt
      updatedAt
    }

    insertedAt
    updatedAt
  }
`;

export const INGREDIENTS_QUERY = gql`
  query ingredients($search: String, $limit: Int!, $offset: Int!) {
    ingredients(search: $search, limit: $limit, offset: $offset) {
      ...IngredientFragment
    }
  }
  ${INGREDEINT_FRAGMENT}
`;

export const INGREDIENTS_COUNT_QUERY = gql`
  query countIngredients($search: String) {
    countIngredients(search: $search)
  }
`;

export const INGREDIENT_QUERY = gql`
  query ingredient($id: ID!) {
    ingredient(id: $id) {
      ...IngredientFragment
    }
  }
  ${INGREDEINT_FRAGMENT}
`;

export const INGREDIENT_CREATE_MUTATION = gql`
  mutation createIngredient($ingredient: IngredientInput!) {
    createIngredient(ingredient: $ingredient) {
      ...IngredientFragment
    }
  }
  ${INGREDEINT_FRAGMENT}
`;

export const INGREDIENT_UPDATE_MUTATION = gql`
  mutation updateIngredient($id: ID, $ingredient: IngredientInput!) {
    updateIngredient(id: $id, ingredient: $ingredient) {
      ...IngredientFragment
    }
  }
  ${INGREDEINT_FRAGMENT}
`;

export const INGREDIENT_DELETE_MUTATION = gql`
  mutation deleteIngredient($id: ID!) {
    deleteIngredient(id: $id)
  }
`;
