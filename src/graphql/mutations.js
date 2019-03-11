import gql from 'graphql-tag';

export const authenticateUserMutation = gql`
  mutation authenticateGoogleUserMutation(
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

export const createSessionMutation = gql`
  mutation createSessionMutation($name: String!, $createdById: ID!) {
    createSession(name: $name, createdById: $createdById) {
      id
      name
      createdBy {
        displayName
      }
    }
  }
`;
