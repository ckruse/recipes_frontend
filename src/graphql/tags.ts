import { gql } from "@apollo/client";

export const TAGS_QUERY = gql`
  query tags($limit: Int, $offset: Int, $search: String) {
    tags(limit: $limit, offset: $offset, search: $search) {
      id
      name

      insertedAt
      updatedAt
    }
  }
`;

export const TAGS_W_COUNT_QUERY = gql`
  query tags($limit: Int, $offset: Int, $search: String) {
    tags(limit: $limit, offset: $offset, search: $search) {
      id
      name
      recipesCount

      insertedAt
      updatedAt
    }
  }
`;

export const TAGS_COUNT_QUERY = gql`
  query countTags($search: String) {
    countTags(search: $search)
  }
`;

export const TAG_QUERY = gql`
  query tag($id: ID!) {
    tag(id: $id) {
      id
      name
      recipesCount
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

export const TAG_DELETE_MUTATION = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`;
