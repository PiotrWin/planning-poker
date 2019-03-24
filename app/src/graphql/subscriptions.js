import gql from 'graphql-tag';

export const USER_SESSIONS = gql`
  subscription ($userId: ID!) {
    Session (
      filter: {
        mutation_in: [CREATED, UPDATED, DELETED]
        node: {
          createdBy: {
            id: $userId
          }
        }
      }
    ) {
      mutation
    }
  }
`;

export const SESSION = gql`
  subscription ($id: ID!) {
    Session(
      filter: {
        mutation_in: [CREATED, UPDATED, DELETED]
        node: {
          id: $id
        }
      }
    ) {
      node {
        clients {
          displayName
        }
      }
    }
  }
`;
