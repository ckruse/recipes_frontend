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

export const TAG_MUTATION = gql`
  mutation tag($id: ID, $tag: TagInput!) {
    mutateTag(id: $id, tag: $tag) {
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
        name

        insertedAt
        updatedAt
      }
    }
  }
`;
