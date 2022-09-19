import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
        token

        user {
          id
          email
          name
          role

          avatar {
            original
            thumb
          }
        }
      }
    }
  }
`;

export const REFRESH_MUTATION = gql`
  mutation refresh($token: String!) {
    refresh(token: $token) {
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
        token

        user {
          id
          email
          name
          role

          avatar {
            original
            thumb
          }
        }
      }
    }
  }
`;
