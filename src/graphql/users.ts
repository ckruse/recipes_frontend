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

export const USER_UPDATE_MUTATION = gql`
  mutation updateUser($id: ID!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const USER_CREATE_MUTATION = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const USER_PASSWORD_MUTATION = gql`
  mutation changePassword($id: ID!, $currentPassword: String!, $password: String!, $passwordConfirmation: String!) {
    changePassword(
      id: $id
      currentPassword: $currentPassword
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
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
