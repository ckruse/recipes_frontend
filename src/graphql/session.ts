import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token

      user {
        id
        email
        name
        role

        avatar
      }
    }
  }
`;

export const REFRESH_MUTATION = gql`
  mutation refresh {
    refresh {
      token

      user {
        id
        email
        name
        role

        avatar
      }
    }
  }
`;
