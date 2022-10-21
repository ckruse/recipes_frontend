import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    email
    active

    avatar {
      original
      thumb
    }

    name
    role
    insertedAt
    updatedAt
  }
`;

export const USERS_QUERY = gql`
  query users($limit: Int!, $offset: Int!, $search: String) {
    users(limit: $limit, offset: $offset, search: $search) {
      ...UserFragment
    }
  }

  ${USER_FRAGMENT}
`;

export const USER_COUNT_QUERY = gql`
  query countUsers($search: String) {
    countUsers(search: $search)
  }
`;

export const USER_GET_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const USER_DELETE_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
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

export const USER_MUTATION = gql`
  mutation mutateUser($id: ID, $user: UserInput!) {
    mutateUser(id: $id, user: $user) {
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
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;
