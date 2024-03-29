import { gql } from "@apollo/client";

export const STEP_FRAGMENT = gql`
  fragment StepFragment on Step {
    id
    name
    position
    preparationTime
    cookingTime
    description

    insertedAt
    updatedAt

    stepIngredients {
      id
      amount
      annotation

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
    defaultServings
    description
    ownerId

    image {
      thumb
      large
      original
    }

    insertedAt
    updatedAt

    steps {
      ...StepFragment
    }

    calories {
      carbs
      fats
      proteins
      alcohol
      calories
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

export const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on Recipe {
    id
    name
    defaultServings
    description
    ownerId

    image {
      thumb
      large
      original
    }

    insertedAt
    updatedAt

    calories {
      carbs
      fats
      proteins
      alcohol
      calories
    }

    tags {
      id
      name
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
`;

export const RECIPE_QUERY = gql`
  query recipe($id: ID!) {
    recipe(id: $id) {
      ...RecipeDetailFragment

      fittingRecipes {
        id
        name
        description
        ownerId

        image {
          thumb
          large
          original
        }

        insertedAt
        updatedAt
      }
    }
  }
  ${RECIPE_DETAIL_FRAGMENT}
`;

export const RANDOM_RECIPE_QUERY = gql`
  query randomRecipe {
    randomRecipe {
      ...RecipeDetailFragment

      fittingRecipes {
        id
        name
        description
        ownerId

        image {
          thumb
          large
          original
        }

        insertedAt
        updatedAt
      }
    }
  }
  ${RECIPE_DETAIL_FRAGMENT}
`;

export const RANDOM_RECIPES_QUERY = gql`
  query randomRecipes($limit: Int!, $tags: [String]) {
    randomRecipes(limit: $limit, tags: $tags) {
      ...RecipeDetailFragment
    }
  }
  ${RECIPE_DETAIL_FRAGMENT}
`;

export const CREATE_RECIPE_MUTATION = gql`
  mutation createRecipe($recipe: RecipeInput!) {
    createRecipe(recipe: $recipe) {
      ...RecipeDetailFragment

      fittingRecipes {
        id
        name
        description
        ownerId

        image {
          thumb
          large
          original
        }

        insertedAt
        updatedAt
      }
    }
  }
  ${RECIPE_DETAIL_FRAGMENT}
`;

export const UPDATE_RECIPE_MUTATION = gql`
  mutation updateRecipe($id: ID, $recipe: RecipeInput!) {
    updateRecipe(id: $id, recipe: $recipe) {
      ...RecipeDetailFragment

      fittingRecipes {
        id
        name
        description
        ownerId

        image {
          thumb
          large
          original
        }

        insertedAt
        updatedAt
      }
    }
  }
  ${RECIPE_DETAIL_FRAGMENT}
`;

export const RECIPE_DELETE_MUTATION = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

export const CREATE_RECIPE_STEP_MUTATION = gql`
  mutation createStep($recipeId: ID!, $step: StepInput!) {
    createStep(recipeId: $recipeId, step: $step) {
      ...StepFragment
    }
  }
  ${STEP_FRAGMENT}
`;

export const UPDATE_RECIPE_STEP_MUTATION = gql`
  mutation updateStep($id: ID!, $step: StepInput!) {
    updateStep(id: $id, step: $step) {
      ...StepFragment
    }
  }
  ${STEP_FRAGMENT}
`;

export const DELETE_RECIPE_STEP_MUTATION = gql`
  mutation deleteStep($id: ID!) {
    deleteStep(id: $id)
  }
`;

export const MOVE_STEP_UP_MUTATION = gql`
  mutation moveStepUp($id: ID!) {
    moveStepUp(id: $id) {
      ...StepFragment
    }
  }
  ${STEP_FRAGMENT}
`;
export const MOVE_STEP_DOWN_MUTATION = gql`
  mutation moveStepDown($id: ID!) {
    moveStepDown(id: $id) {
      ...StepFragment
    }
  }
  ${STEP_FRAGMENT}
`;
