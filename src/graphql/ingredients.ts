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

export const INGREDIENT_MUTATION = gql`
  mutation mutateIngredient($id: ID, $ingredient: IngredientInput!) {
    mutateIngredient(id: $id, ingredient: $ingredient) {
      successful
      messages {
        field
        message
        template
        code
        options {
          key
          value
        }
      }

      result {
        ...IngredientFragment
      }
    }
  }
  ${INGREDEINT_FRAGMENT}
`;

export const INGREDIENT_DELETE_MUTATION = gql`
  mutation deleteIngredient($id: ID!) {
    deleteIngredient(id: $id) {
      successful
      messages {
        field
        message
        template
        code
        options {
          key
          value
        }
      }

      result {
        id
      }
    }
  }
`;
