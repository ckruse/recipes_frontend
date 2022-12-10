import { gql } from "@apollo/client";

export const TAGS_QUERY = gql`
  query tags($limit: Int!, $offset: Int!, $search: String) {
    tags(limit: $limit, offset: $offset, search: $search) {
      id
      name

      insertedAt
      updatedAt
    }
  }
`;

export const TAG_CREATE_MUTATION = gql`
  mutation createTag($name: String!) {
    createTag(name: $name) {
      id
      name

      insertedAt
      updatedAt
    }
  }
`;
