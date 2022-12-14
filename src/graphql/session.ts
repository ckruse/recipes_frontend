import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
      role

      avatar {
        thumb
        original
      }
    }
  }
`;

export const REFRESH_MUTATION = gql`
  mutation refresh {
    refresh {
      id
      email
      name
      role

      avatar {
        thumb
        original
      }
    }
  }
`;
