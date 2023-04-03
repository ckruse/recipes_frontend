import { gql } from "@apollo/client";

import { RECIPE_FRAGMENT } from "./recipes";

export const WEEKPLAN_FRAGMENT = gql`
  fragment WeekplanFragment on Weekplan {
    id
    userId
    date
    recipeId
    portions

    insertedAt
    updatedAt

    recipe {
      ...RecipeFragment
    }
  }

  ${RECIPE_FRAGMENT}
`;

export const LIST_WEEKPLAN_QUERY = gql`
  query weekplans($week: NaiveDate!) {
    weekplans(week: $week) {
      ...WeekplanFragment
    }
  }

  ${WEEKPLAN_FRAGMENT}
`;

export const CREATE_WEEKPLAN = gql`
  mutation createWeekplan($week: NaiveDate!, $tags: [String!], $portions: Int, $days: [Int!]) {
    createWeekplan(week: $week, tags: $tags, portions: $portions, days: $days) {
      ...WeekplanFragment
    }
  }

  ${WEEKPLAN_FRAGMENT}
`;

export const DELETE_WEEKPLAN = gql`
  mutation deleteWeekplan($id: ID!) {
    deleteWeekplan(id: $id)
  }
`;

export const REPLACE_WEEKPLAN_RECIPE = gql`
  mutation replaceWeekplanRecipe($id: ID!, $tags: [String!]) {
    replaceWeekplanRecipe(id: $id, tags: $tags) {
      ...WeekplanFragment
    }
  }
  ${WEEKPLAN_FRAGMENT}
`;

export const REPLACE_WEEKPLAN_RECIPE_WITH_RECIPE = gql`
  mutation replaceWeekplanRecipeWithRecipe($id: ID!, $recipeId: ID!) {
    replaceWeekplanRecipeWithRecipe(id: $id, recipeId: $recipeId) {
      ...WeekplanFragment
    }
  }
  ${WEEKPLAN_FRAGMENT}
`;
