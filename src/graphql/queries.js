import gql from 'graphql-tag';

export const getUserQuery = gql`
  query getUser($id: ID!) {
    User(id: $id) {
      id
      displayName
      email
      ownSessions
      visitedSessions
    }
  }
`;

export const getSessionQuery = gql`
  query getSession($id: ID!) {
    Session(id: $id) {
      name
      createdAt
      createdBy {
        displayName
      }
      clients {
        displayName
      }
      _clientsMeta {
        count
      }
    }
  }
`;
