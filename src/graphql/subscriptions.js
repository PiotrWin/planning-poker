import gql from 'graphql-tag';

export const userSessions = gql`
  subscription ($id: ID!) {
    User(
      filter: {
        mutation_in: [CREATED, UPDATED, DELETED]
        node: {
          id: $id
        }
      }
    ) {
      node {
        ownSessions {
          id
          name
          createdAt
          createdBy {
            id
            displayName
          }
        }
        visitedSessions {
          id
          name
          createdAt
          createdBy {
            id
            displayName
          }
        }
      }
    }
  }
`;

export const session = gql`
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
