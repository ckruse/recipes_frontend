import { gql } from "@apollo/client";

import { RECIPE_DETAIL_FRAGMENT } from "./recipes";

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
      ...RecipeDetailFragment
    }
  }

  ${RECIPE_DETAIL_FRAGMENT}
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
  mutation createWeekplan($week: NaiveDate!, $tags: [String!]) {
    createWeekplan(week: $week, tags: $tags) {
      ...WeekplanFragment
    }
  }

  ${WEEKPLAN_FRAGMENT}
`;
