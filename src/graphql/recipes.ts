import { gql } from "@apollo/client";

export const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on Recipe {
    id
    name
    description

    calories

    insertedAt
    updatedAt

    tags {
      id
      name
      insertedAt
      updatedAt
    }
  }
`;

export const STEP_FRAGMENT = gql`
  fragment StepFragment on Step {
    id
    position
    preparationTime
    cookingTime
    description

    insertedAt
    updatedAt

    stepIngredients {
      id
      amount

      unitId
      unit {
        id
        identifier
        baseValue
      }

      stepId
      ingredientId

      insertedAt
      updatedAt

      ingredient {
        id
        name
        reference

        alc
        carbs
        fat
        proteins

        units {
          id
          identifier
          baseValue
        }
      }
    }
  }
`;

export const RECIPE_DETAIL_FRAGMENT = gql`
  fragment RecipeDetailFragment on Recipe {
    id
    name
    description

    calories

    insertedAt
    updatedAt

    steps {
      ...StepFragment
    }

    tags {
      id
      name
      insertedAt
      updatedAt
    }
  }
  ${STEP_FRAGMENT}
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
      ...RecipeDetailFragment
    }
  }
  ${RECIPE_DETAIL_FRAGMENT}
`;

export const RECIPE_MUTATION = gql`
  mutation mutateRecipe($id: ID, $recipe: RecipeInput!) {
    mutateRecipe(id: $id, recipe: $recipe) {
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
        ...RecipeDetailFragment
      }
    }
  }
  ${RECIPE_DETAIL_FRAGMENT}
`;

export const RECIPE_DELETE_MUTATION = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
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

export const RECIPE_STEP_MUTATION = gql`
  mutation mutateStep($recipeId: ID!, $id: ID, $step: StepInput!) {
    mutateStep(recipeId: $recipeId, id: $id, step: $step) {
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
        ...StepFragment
      }
    }
  }
  ${STEP_FRAGMENT}
`;
