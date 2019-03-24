import gql from 'graphql-tag';

export const AUTHENTICATE_USER = gql`
  mutation (
    $googleToken: String!,
    $displayName: String!,
    $email: String!
  ) {
    authenticateGoogleUser(
      googleToken: $googleToken,
      displayName: $displayName,
      email: $email
    ) {
        id
        displayName
        email
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation ($name: String!, $createdById: ID!) {
    createSession(name: $name, createdById: $createdById) {
      id
      name
      createdBy {
        displayName
      }
    }
  }
`;
