import { gql } from "@apollo/client";

export const TAGS_QUERY = gql`
  query tags($limit: Int!, $offset: Int!, $search: String) {
    tags(limit: $limit, offset: $offset, search: $search) {
      id
      tag

      insertedAt
      updatedAt
    }
  }
`;

export const TAG_MUTATION = gql`
  mutation mutateTag($name: String!) {
    mutateTag(name: $name) {
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
        tag

        insertedAt
        updatedAt
      }
    }
  }
`;
